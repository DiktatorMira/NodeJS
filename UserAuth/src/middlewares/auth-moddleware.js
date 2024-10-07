import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authToken = (req, res, next) => {
    const authHeader = req.header("Authorization"), token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Доступ запрещен, токен отсутствует!" });

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") return res.status(403).json({ error: "Токен истек!" });
        return res.status(400).json({ error: "Неверный токен" });
    }
};