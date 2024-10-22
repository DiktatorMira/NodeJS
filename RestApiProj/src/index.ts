import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import { userRouter } from './routes/user-router';
import { roleRouter } from './routes/role-router';
import { authRouter } from './routes/auth-router';
import './types/express';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/roles', roleRouter);
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Сервер запущен на порту 3000');
    });
}).catch(error => console.log('Ошибка подключения к базе данных:', error));