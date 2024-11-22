import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user-model';
import { Role } from '../models/role-model';

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userId = (req as any).userId;
    if (!userId) return res.status(401).json({ message: 'Неавторизованный доступ!' });
    try {
        const user = await User.findByPk(userId), role = await Role.findByPk(user?.role_id);

        if (!user || role?.role_name !== 'admin') return res.status(403).json({ message: 'Доступ запрещен!' });
        next();
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при проверке роли пользователя', error });
    }
};