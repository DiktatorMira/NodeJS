import { Router } from "express";
import { sendNewsEmail } from "../mailer/newsMailer.js";

export const newsRoutes = Router();
newsRoutes.post("/send-news", async (req, res) => {
    const { email, subject, text } = req.body;
    try {
        await sendNewsEmail(email, subject, text);
        res.status(200).send("News email sent successfully!");
    } catch (error) { res.status(500).send("Failed to send news email."); }
});
newsRoutes.get("/send-form", (req, res) => {
    res.render("send-news");
});