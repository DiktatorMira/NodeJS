import { Router } from "express";
import bcrypt from "bcrypt";
import validator from "validator";

export const userRoutes = Router();

userRoutes.post("/user/signup", async (req, res) => {
    const { login, email, password, confirm_password } = req.body;

    if (!validator.isEmail(email)) return res.status(400).send("Неправильный формат email.");
    if (!validator.isLength(password, { min: 6 })) return res.status(400).send("Пароль должен быть не менее 6 символов.");
    if (password !== confirm_password) return res.status(400).send("Пароли не совпадают.");

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
        login,
        email,
        password: hashedPassword,
    });
    res.cookie("user", login, {
        httpOnly: true,
        maxAge: 1000000,
    });
    res.redirect("/");
});
userRoutes.post("/user/signin", async (req, res) => {
    const { login, password } = req.body;

    const user = users.find(u => u.login === login);
    if (!user) return res.status(400).send("Пользователь не найден.");
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return res.status(400).send("Неправильный пароль.");

    res.cookie("user", login, {
        httpOnly: true,
        maxAge: 1000000,
    });
    res.redirect("/");
});
userRoutes.get("/user/logout", (req, res) => {
    res.clearCookie("user");
    res.redirect("/");
});