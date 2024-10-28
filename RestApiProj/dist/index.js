"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const user_router_1 = require("./routes/user-router");
const auth_router_1 = require("./routes/auth-router");
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/users", user_router_1.userRouter);
app.use("/auth", auth_router_1.authRouter);
database_1.connection
    .sync()
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Сервер запущен на порту ${process.env.PORT}`);
    });
})
    .catch((error) => console.log("Ошибка подключения к базе данных:", error));
// npx tsc -init - создание tsconfig.json
// npx tsc - создание dist
// npm start - запуск проекта(команда прописана в package.json)
