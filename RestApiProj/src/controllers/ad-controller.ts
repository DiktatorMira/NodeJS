import { Request, Response } from 'express';
import { Advertisement } from '../models/ad-model';
import { redisClient } from '../config/redis';
import { upload } from '../middlewares/uppload-middleware';

export class AdvertisementController {
    static async create(req: Request, res: Response) {
        upload.array('images')(req, res, async (err) => {
            if (err) return res.status(400).json({ error: err.message });
            try {
                const { title, description, price, location, user_id, category_id } = req.body;
                const imagePaths = req.files ? (req.files as Express.Multer.File[]).map(file => file.path) : [];
                const advertisement = await Advertisement.create({
                    title,
                    description,
                    price,
                    location,
                    user_id: parseInt(user_id),
                    category_id: parseInt(category_id),
                    upload_date: new Date(),
                    status: false,
                    images: imagePaths
                });
                res.status(201).json(advertisement);
            } catch (error) {
                res.status(500).json({ error: (error as Error).message });
            }
        });
    }
    static async getAll(req: Request, res: Response) : Promise<any> {
        try {
            const cacheKey = 'ads:all', cachedAds = await redisClient.get(cacheKey);
            if (cachedAds) return res.status(200).json(JSON.parse(cachedAds));

            const ads = await Advertisement.findAll();
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(ads));
            res.status(200).json(ads);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении объявлений', error });
        }
    }
    static async getById(req: Request, res: Response) {
        const advertisement = await Advertisement.findByPk(req.params.id);
        advertisement ? res.json(advertisement) : res.status(404).json({ message: 'Объявление не найдено!' });
    }
    static async update(req: Request, res: Response) : Promise<any> {
        try {
            const { adId, newStatus } = req.body;
            const ad = await Advertisement.findByPk(adId);
            if (!ad) return res.status(404).json({ message: 'Объявление не найдено' });
            ad.status = newStatus;
            await ad.save();
            return res.status(200).json({ message: 'Статус объявления обновлен', ad });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера', error });
        }
    }
    static async delete(req: Request, res: Response) : Promise<any> {
        try {
            const { adId } = req.params;
            const ad = await Advertisement.findByPk(adId);
            if (!ad) return res.status(404).json({ message: 'Объявление не найдено' });
            await ad.destroy();
            return res.status(200).json({ message: 'Объявление удалено' });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера', error });
        }
    }
}