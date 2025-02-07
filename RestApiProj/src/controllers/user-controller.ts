import { Request, Response } from 'express';
import { User } from '../models/user-model';
import { Role } from '../models/role-model';
import { redisClient } from '../config/redis';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { role_id, email, hash_pass, name, avatar } = req.body;
        const newUser = await User.create({
            role_id,
            email,
            hash_pass,
            name,
            avatar,
            created_date: new Date(),
            last_activity: new Date(),
            status: true
        });
        await redisClient.del('user:all');
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании пользователя', error });
    }
};
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();

        if (users.length > 0)  res.status(200).json(users);
        else res.status(404).json({ message: 'Пользователи не найдены' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении пользователей', error });
    }
};
export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user_id = req.params.id, user = await User.findByPk(user_id, { include: [Role] });

        if (user) res.status(200).json(user);
        else res.status(404).json({ message: 'Пользователь не найден!' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении пользователя', error });
    }
};
export const updateUser = async (req: Request, res: Response) : Promise<any> => {
    try {
        const { role_id, email, name, avatar, status } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

        if (user) {
            user.role_id = role_id || user.role_id;
            user.email = email || user.email;
            user.name = name || user.name;
            user.avatar = avatar || user.avatar;
            user.status = status !== undefined ? status : user.status;
            user.last_activity = new Date();
            
            await user.save();
            res.status(200).json(user);
        } else res.status(404).json({ message: 'Пользователь не найден!' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении пользователя', error });
    }
};
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk(req.params.id);
        
        if (user) {
            await user.destroy();
            res.status(200).json({ message: 'Пользователь удален' });
        } else res.status(404).json({ message: 'Пользователь не найден!' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении пользователя', error });
    }
};