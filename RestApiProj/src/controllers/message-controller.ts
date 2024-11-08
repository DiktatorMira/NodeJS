import { Request, Response } from 'express';
import { Message } from '../models/message-model';
import { redisClient } from '../config/redis';

export class MessageController {
    static async create(req: Request, res: Response) {
        try {
            const message = await Message.create(req.body);
            await redisClient.del('message:all');
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при создании сообщения', error });
        }
    }
    static async getAll(req: Request, res: Response) {
        try {
            const cacheKey = 'message:all', cachedAds = await redisClient.get(cacheKey);
            if (cachedAds) return res.status(200).json(JSON.parse(cachedAds));

            const messages = await Message.findAll();
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(messages));
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении сообщений', error });
        }
    }
    static async getById(req: Request, res: Response) {
        const message = await Message.findByPk(req.params.id);
        message ? res.json(message) : res.status(404).json({ message: 'Сообщение не найдено!' });
    }
    static async update(req: Request, res: Response) {
        const [updated] = await Message.update(req.body, { where: { id: req.params.id } });
        updated ? res.json(await Message.findByPk(req.params.id)) : res.status(404).json({ message: 'Сообщение не найдено!' });
    }
    static async delete(req: Request, res: Response) {
        const deleted = await Message.destroy({ where: { id: req.params.id } });
        deleted ? res.status(204).send() : res.status(404).json({ message: 'Сообщение не найдено!' });
    }
}