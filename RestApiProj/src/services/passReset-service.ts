import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { User } from '../models/user-model';
import { PasswordResetToken } from '../models/passReset-token';

export class PasswordResetService {
    static async sendPasswordResetEmail(email: string) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('Пользователь не найден!');

        const token = crypto.randomBytes(32).toString('hex'), expiryDate = new Date(Date.now() + 60 * 60 * 1000);
        await PasswordResetToken.create({ userId: user.id, token, expiryDate });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Запрос на сброс пароля',
            text: `Пожалуйста, воспользуйтесь следующей ссылкой для сброса пароля: ${process.env.FRONTEND_URL}/reset-password?token=${token}`
        };
        await transporter.sendMail(mailOptions);
    }

    static async resetPassword(token: string, newPassword: string) {
        const resetToken = await PasswordResetToken.findOne({ where: { token } }); // Убрать запятую здесь
        if (!resetToken || resetToken.expiryDate < new Date()) throw new Error('Токен просрочен или недействителен!');
        const user = await User.findByPk(resetToken.userId);
        if (!user) throw new Error('Пользователь не найден!');
    
        user.hash_pass = await bcrypt.hash(newPassword, 10);
        await user.save();
        await resetToken.destroy();
    }
}