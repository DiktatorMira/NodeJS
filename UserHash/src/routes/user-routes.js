import { Router } from "express";

export const userRoutes = Router();

userRoutes.route("/signin").get((req, res) => {
    res.render("form_auth"); 
}).post(authUser, (req, res) => {
    req.session.user = {
        login: req.body.login,
        email: req.body.email,
    };
    res.redirect("/");
});
userRoutes.get("/", (req, res) => {
    res.json(users);
    res.end();
});
userRoutes.route("/signup").get((req, res) => {
    res.render("form_register");
}).post(createUser, (req, res) => {
    req.session.user = {
        login: req.body.login,
        email: req.body.email,
    };
    res.redirect("/");
});
userRoutes.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});