import { Request, Response } from 'express';
import { Role } from '../models/role-model';
import { redisClient } from '../config/redis';

export class RoleController {
    static async create(req: Request, res: Response) {
        try {
            const role = await Role.create(req.body);
            await redisClient.del('role:all');
            res.status(201).json(role);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при создании роли', error });
        }
    }
    static async getAll(req: Request, res: Response) : Promise<any> {
        try {
            const cacheKey = 'role:all', cachedAds = await redisClient.get(cacheKey);
            if (cachedAds) return res.status(200).json(JSON.parse(cachedAds));

            const roles = await Role.findAll();
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(roles));
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении ролей', error });
        }
    }
    static async getById(req: Request, res: Response) {
        const role = await Role.findByPk(req.params.id);
        role ? res.json(role) : res.status(404).json({ message: 'Роль не найдена!' });
    }
    static async update(req: Request, res: Response) {
        const [updated] = await Role.update(req.body, { where: { id: req.params.id } });
        updated ? res.json(await Role.findByPk(req.params.id)) : res.status(404).json({ message: 'Роль не найдена!' });
    }
    static async delete(req: Request, res: Response) {
        const deleted = await Role.destroy({ where: { id: req.params.id } });
        deleted ? res.status(204).send() : res.status(404).json({ message: 'Роль не найдена!' });
    }
}