import express from "express";
import { connection } from "./config/database";
import { userRouter } from "./routes/user-router";
import { authRouter } from "./routes/auth-router";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/auth", authRouter);
connection
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