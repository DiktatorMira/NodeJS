import { Router } from "express";
import { users } from "../data/users.js";
import bcrypt from "bcrypt";
import { authToken } from "../middleware/auth.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token-utils.js";
import jwt from "jsonwebtoken";

export const userRoutes = Router();

userRoutes.get("/", authToken, (req, res) => {
    res.json(users.map(u => ({ id: u.id, login: u.login, email: u.email })));
});
userRoutes.post("/login", async (req, res) => {
    const { login, password } = req.body, user = users.find(u => u.login === login);
    if (!user) return res.status(404).json({ error: "Пользователь не найден." });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Неверный пароль!" });

    const accessToken = generateAccessToken(user), refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    res.json({ accessToken, refreshToken });
});
userRoutes.post("/token", (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: "Refresh токен отсутствует!" });

    const user = users.find(u => u.refreshToken === refreshToken);
    if (!user) return res.status(403).json({ error: "Неверный refresh токен!" });

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
    } catch (error) { return res.status(403).json({ error: "Неверный refresh токен" }); }
});
userRoutes.post("/logout", (req, res) => {
    const { refreshToken } = req.body, user = users.find(u => u.refreshToken === refreshToken);
    if (user) user.refreshToken = null;
    res.sendStatus(204);
});
userRoutes.get("/view", authToken, (req, res) => {
    res.render("users", { users: users.map(u => ({ login: u.login, email: u.email })) });
});