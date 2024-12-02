import { Request, Response, NextFunction } from "express";
import { User } from "../models/user-model";
import { Role } from "../models/role-model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { email, password, name, role_id  } = req.body, existingUser = await User.findOne({ where: { email } }), role = await Role.findByPk(role_id);
            if (existingUser) return res.status(400).json({ message: "Пользователь с таким email уже существует!" });
            if (!role) return res.status(400).json({ message: "Указанная роль не существует!" });

            const hash_pass = await bcrypt.hash(password, 10), user = await User.create({
                email,
                hash_pass,
                name,
                role_id,
                created_date: new Date(),
                last_activity: new Date(),
            });
            return res.status(201).json({ message: "Пользователь успешно зарегистрирован", user });
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
            next(error); 
        }
    }
    
    static async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { email, password } = req.body, user = await User.findOne({ where: { email } });
            if (!user) return res.status(400).json({ message: "Неверные email или пароль" });
            const isMatch = await bcrypt.compare(password, user!.hash_pass);
            if (!isMatch) return res.status(400).json({ message: "Неверные email или пароль" });

            const token = jwt.sign(
                { user_id: user.user_id, email: user.email },
                process.env.JWT_SECRET as string,
                { expiresIn: "1h" }
            );
            return res.json({ message: "Успешная аутентификация", token });
        } catch (error) { next(error); }
    }

    static verifyToken(req: Request, res: Response, next: NextFunction): any {
        const token = req.headers["authorization"];
        if (!token) return res.status(401).json({ message: "Токен не предоставлен!" });
        if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET не задан!");

        jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
            if (err) return res.status(401).json({ message: "Неверный токен!" });
            (req as any).user = decoded;
            next();
        });
    }
}