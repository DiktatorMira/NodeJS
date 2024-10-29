import { Request, Response } from 'express';
import { PasswordResetService } from '../services/passReset-service';

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
}