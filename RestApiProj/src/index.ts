import express from "express";
import { connection } from "./config/database";
import { userRouter } from "./routes/user-router";
import { roleRouter } from "./routes/role-router";
import { advertisementRouter } from "./routes/ad-router";
import { categoryRouter } from "./routes/category-router";
import { messageRouter } from "./routes/message-router";
import { authRouter } from "./routes/auth-router";
import { Role } from "./models/role-model";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/advertisements", advertisementRouter);
app.use("/category", categoryRouter);
app.use("/message", messageRouter);
app.use("/auth", authRouter);
connection.sync().then(async () => {
    app.listen(process.env.PORT, () => {
        console.log(`Сервер запущен на порту ${process.env.PORT}`);
    });
}).catch((error) => console.log("Ошибка подключения к базе данных:", error));

// npx tsc -init - создание tsconfig.json
// npx tsc - создание dist
// npm start - запуск проекта(команда прописана в package.json)
// npx ts-node src/index.ts - запуск без dist