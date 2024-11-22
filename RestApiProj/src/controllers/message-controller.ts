import { Request, Response } from 'express';
import { Message } from '../models/message-model';
import { redisClient } from '../config/redis';

export class MessageController {
    static async create(req: Request, res: Response) : Promise<any> {
        try {
            const { sender_id, receiver_id, content } = req.body;
            if (!sender_id || !receiver_id || !content) {
                return res.status(400).json({ message: 'Все поля (sender_id, receiver_id, content) обязательны.' });
            }

            const message = await Message.create(req.body);
            await redisClient.del('message:all');
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при создании сообщения', error });
        }
    }
    static async getAll(req: Request, res: Response) : Promise<any> {
        try {
            const cacheKey = 'message:all', cachedMessages = await redisClient.get(cacheKey);
            if (cachedMessages) return res.status(200).json(JSON.parse(cachedMessages));

            const messages = await Message.findAll();
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(messages));
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении сообщений', error });
        }
    }
    static async getById(req: Request, res: Response) : Promise<any>{
        try {
            const { id } = req.params, cacheKey = `message:${id}`, cachedMessage = await redisClient.get(cacheKey);

            if (cachedMessage) return res.status(200).json(JSON.parse(cachedMessage));
            const message = await Message.findByPk(id);
            if (!message) return res.status(404).json({ message: 'Сообщение не найдено!' });

            await redisClient.setEx(cacheKey, 3600, JSON.stringify(message));
            res.json(message);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении сообщения', error });
        }
    }
    static async update(req: Request, res: Response) : Promise<any>{
        try {
            const { id } = req.params, [updated] = await Message.update(req.body, { where: { message_id: id } });
            if (!updated) return res.status(404).json({ message: 'Сообщение не найдено!' });

            const updatedMessage = await Message.findByPk(id);
            await redisClient.del('message:all');
            await redisClient.del(`message:${id}`);
            res.json(updatedMessage);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при обновлении сообщения', error });
        }
    }
    static async delete(req: Request, res: Response) : Promise<any>{
        try {
            const { id } = req.params, deleted = await Message.destroy({ where: { message_id: id } });
            if (!deleted) return res.status(404).json({ message: 'Сообщение не найдено!' });

            await redisClient.del('message:all');
            await redisClient.del(`message:${id}`);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при удалении сообщения', error });
        }
    }
}