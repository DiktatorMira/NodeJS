import { Request, Response } from 'express';
import { User } from '../models/User';
import { Role } from '../models/Role';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password, roleId } = req.body;
        const user = await User.create({ username, password, roleId });
        res.status(201).json(user);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll({ include: [Role] });
        res.status(200).json(users);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { username, password, roleId } = req.body;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ message: 'Пользователь не найден' });
            return;
        }

        user.username = username || user.username;
        user.password = password || user.password;
        user.roleId = roleId || user.roleId;

        await user.save();
        res.status(200).json({ message: 'Пользователь обновлен', user });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ message: 'Пользователь не найден' });
            return;
        }

        await user.destroy();
        res.status(200).json({ message: 'Пользователь удален' });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};