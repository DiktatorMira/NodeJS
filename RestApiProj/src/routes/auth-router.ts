import { Router, Request, Response } from 'express';
import { registerUser, findUserByUsername } from '../services/user-service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
export const authRouter = Router(), JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';

authRouter.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await registerUser(username, password);
        res.status(201).json({ message: 'Пользователь зарегистрирован', user });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    }
});
authRouter.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await findUserByUsername(username);
        if (!user) return res.status(400).json({ message: 'Пользователь не найден' });
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Неверный пароль' });

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Успешная аутентификация', token });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});