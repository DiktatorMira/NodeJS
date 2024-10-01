import { users } from "../data/users.js";
import bcrypt from "bcrypt";

export const createUser = (req, res, next) => {
    const { login, email, password } = req.body;
    const user = users.find((el) => el.login === login || el.email === email);
    if (!user) {
        users.push({
            id: users.length + 1,
            login: login,
            email: email,
            password: bcrypt.hashSync(password, 10)
        });
        next();
        return;
    }
    res.status(400);
    res.redirect("/");
};