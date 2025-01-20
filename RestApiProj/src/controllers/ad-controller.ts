import { Request, Response } from 'express';
import { Advertisement } from '../models/ad-model';
import { redisClient } from '../config/redis';
import { upload } from '../middlewares/uppload-middleware';
import { Op } from 'sequelize';

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
    static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const ads = await Advertisement.findAll();
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
            const { id } = req.params;
            const { title, description, price, location, category_id } = req.body;
            const ad = await Advertisement.findByPk(id);
            if (!ad) return res.status(404).json({ message: 'Объявление не найдено' });

            ad.title = title || ad.title;
            ad.description = description || ad.description;
            ad.price = price || ad.price;
            ad.location = location || ad.location;
            ad.category_id = category_id || ad.category_id;

            await ad.save();
            res.json(ad);
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
    static async search(req: Request, res: Response) {
        try {
            const { keyword, category, minPrice, maxPrice, location } = req.query;
            const whereClause: any = {};
    
            if (keyword) whereClause.title = { [Op.like]: `%${keyword}%` };
            if (category) whereClause.category_id = category;
            if (minPrice) whereClause.price = { [Op.gte]: parseFloat(minPrice as string) };
            if (maxPrice) whereClause.price = { [Op.lte]: parseFloat(maxPrice as string) };
            if (location) whereClause.location = { [Op.like]: `%${location}%` };
    
            const ads = await Advertisement.findAll({ where: whereClause });
            res.json(ads);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при поиске объявлений', error });
        }
    }
    static async markAsSold(req: Request, res: Response) : Promise<any> {
        try {
            const { id } = req.params, ad = await Advertisement.findByPk(id);
            if (!ad) return res.status(404).json({ message: 'Объявление не найдено' });
    
            ad.is_sold = true;
            await ad.save();
            res.json({ message: 'Объявление отмечено как проданное' });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при обновлении статуса', error });
        }
    }
}