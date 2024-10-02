import express from "express";
import dotenv from "dotenv";
import exphbs from "express-handlebars";
import { userRoutes } from "./routes/user-routes.js";

dotenv.config();
const PORT = process.env.PORT || 3000, app = express();
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(path.resolve(), "src/views"));
app.use("/api/user", userRoutes);
app.listen(PORT, () => {
    console.log(`Сервер запущен, порт: ${PORT}`);
});