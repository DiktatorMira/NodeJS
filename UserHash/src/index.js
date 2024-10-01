import express from "express";
import exphbs from "express-handlebars";
import cookieParser from "cookie-parser";
import path from "node:path";
import session from "express-session";
import "dotenv/config";
import { siteRoutes } from "./routes/site-routes.js";
import { userRoutes } from "./routes/user-routes.js";
import { checkUser } from "./middlewares/checkuser-middleware.js";
import { accessControl } from './middlewares/accesscontrol-middleware.js';

const PORT = process.env.PORT || 3000, server = express();
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
});

server.use(cookieParser());
server.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
    })
);
server.use(checkUser);
server.use(accessControl);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.engine("hbs", hbs.engine);
server.set("view engine", "hbs");
server.set("views", path.join("src", "views"));
server.use(siteRoutes);
server.use("/user", userRoutes);
server.listen(PORT, () =>
    console.log(`Сервер работает на http://localhost:${PORT}`)
);