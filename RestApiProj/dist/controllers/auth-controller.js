"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_model_1 = require("../models/user-model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
class AuthController {
    static async register(req, res, next) {
        try {
            const { email, password, name } = req.body, existingUser = await user_model_1.User.findOne({ where: { email } });
            if (existingUser)
                return res.status(400).json({ message: "Пользователь с таким email уже существует!" });
            const hash_pass = await bcryptjs_1.default.hash(password, 10), user = await user_model_1.User.create({
                email,
                hash_pass,
                name,
                created_date: new Date(),
                last_activity: new Date(),
            });
            return res.status(201).json({ message: "Пользователь успешно зарегистрирован", user });
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body, user = await user_model_1.User.findOne({ where: { email } });
            if (!user)
                return res.status(400).json({ message: "Неверные email или пароль" });
            const isMatch = await bcryptjs_1.default.compare(password, user.hash_pass);
            if (!isMatch)
                return res.status(400).json({ message: "Неверные email или пароль" });
            const token = jsonwebtoken_1.default.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.json({ message: "Успешная аутентификация", token });
        }
        catch (error) {
            next(error);
        }
    }
    static verifyToken(req, res, next) {
        const token = req.headers["authorization"];
        if (!token)
            return res.status(401).json({ message: "Токен не предоставлен!" });
        if (!process.env.JWT_SECRET)
            throw new Error("JWT_SECRET не задан!");
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res.status(401).json({ message: "Неверный токен!" });
            req.user = decoded;
            next();
        });
    }
}
exports.AuthController = AuthController;
