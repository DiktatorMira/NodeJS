import { Router } from "express";

export const siteRoutes = Router();

siteRoutes.get("/", (req, res) => {
    res.render("home");
});