import { Request, Response } from 'express';
import { Role } from '../models/Role';

export const createRole = async (req: Request, res: Response): Promise<void> => {
    try {
        const { roleName } = req.body;
        const role = await Role.create({ roleName });
        res.status(201).json(role);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};
export const getRoles = async (req: Request, res: Response): Promise<void> => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};
export const updateRole = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { roleName } = req.body;
        const role = await Role.findByPk(id);
        if (!role) {
            res.status(404).json({ message: 'Роль не найдена' });
            return;
        }

        role.roleName = roleName || role.roleName;
        await role.save();
        res.status(200).json({ message: 'Роль обновлена', role });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};
export const deleteRole = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id);
        if (!role) {
            res.status(404).json({ message: 'Роль не найдена' });
            return;
        }

        await role.destroy();
        res.status(200).json({ message: 'Роль удалена' });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};