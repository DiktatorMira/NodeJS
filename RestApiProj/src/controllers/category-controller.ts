import { Request, Response } from 'express';
import { Category } from '../models/category-model';
import { redisClient } from '../config/redis';

export class CategoryController {
    static async create(req: Request, res: Response) {
        try {
            const category = await Category.create(req.body);
            await redisClient.del('category:all');
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при создании категории', error });
        }
    }
    static async getAll(req: Request, res: Response) {
        try {
            const cacheKey = 'category:all', cachedAds = await redisClient.get(cacheKey);
            if (cachedAds) return res.status(200).json(JSON.parse(cachedAds));

            const categories = await Category.findAll();
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(categories));
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении категорий', error });
        }
    }
    static async getById(req: Request, res: Response) {
        const category = await Category.findByPk(req.params.id);
        category ? res.json(category) : res.status(404).json({ message: 'Категория не найдена!' });
    }
    static async update(req: Request, res: Response) {
        const [updated] = await Category.update(req.body, { where: { id: req.params.id } });
        updated ? res.json(await Category.findByPk(req.params.id)) : res.status(404).json({ message: 'Категория не найдена!' });
    }
    static async delete(req: Request, res: Response) {
        const deleted = await Category.destroy({ where: { id: req.params.id } });
        deleted ? res.status(204).send() : res.status(404).json({ message: 'Категория не найдена!' });
    }
}