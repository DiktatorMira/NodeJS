import { Request, Response } from 'express';
import { PasswordResetService } from '../services/passReset-service';
import { PasswordReset } from '../models/passwordReset-model';

export class PasswordResetController {
    static async requestPasswordReset(req: Request, res: Response): Promise<any> {
        const { email } = req.body;
        try {
            await PasswordResetService.sendPasswordResetEmail(email);
            return res.status(200).json({ message: 'Письмо для сброса пароля отправлено' });
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка отправки письма для сброса пароля: ', error });
        }
    }
    static async resetPassword(req: Request, res: Response): Promise<any> {
        const { token, newPassword } = req.body;
        try {
            await PasswordResetService.resetPassword(token, newPassword);
            return res.status(200).json({ message: 'Пароль сброшен' });
        } catch (error) {
            return res.status(400).json({ message: 'Недействительный или просроченный токен: ', error });
        }
    }
    static async create(req: Request, res: Response) {
        const passReset = await PasswordReset.create(req.body);
        res.status(201).json(passReset);
    }
    static async getAll(req: Request, res: Response) {
        const passReset = await PasswordReset.findAll();
        res.json(passReset);
    }
    static async getById(req: Request, res: Response) {
        const passReset = await PasswordReset.findByPk(req.params.id);
        passReset ? res.json(passReset) : res.status(404).json({ message: 'Хешированный пароль не найден!' });
    }
    static async update(req: Request, res: Response) {
        const [updated] = await PasswordReset.update(req.body, { where: { id: req.params.id } });
        updated ? res.json(await PasswordReset.findByPk(req.params.id)) : res.status(404).json({ message: 'Хешированный пароль не найден!' });
    }
    static async delete(req: Request, res: Response) {
        const deleted = await PasswordReset.destroy({ where: { id: req.params.id } });
        deleted ? res.status(204).send() : res.status(404).json({ message: 'Хешированный пароль не найден!' });
    }
}