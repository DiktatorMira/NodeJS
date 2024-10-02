import { Router } from "express";
import { users } from "../data/users.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { authToken } from "../middleware/auth.js";

dotenv.config();
export const userRoutes = Router(), JWT_SECRET = process.env.JWT_SECRET;

router.get("/", authToken, (req, res) => {
    res.json(users);
});
router.post("/", async (req, res) => {
    const { login, password } = req.body;
    const user = users.find(u => u.login === login);
    if (!user) return res.status(404).json({ error: "Пользователь не найден" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Неверный пароль" });

    const token = jwt.sign({ id: user.id, login: user.login }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});
router.get("/view", authToken, (req, res) => {
    res.render("users", { users });
});