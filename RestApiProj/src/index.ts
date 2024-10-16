import express from 'express';
import dotenv from 'dotenv';
import {router} from './routes/auth-router';
import './types/express';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/auth', router);
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});