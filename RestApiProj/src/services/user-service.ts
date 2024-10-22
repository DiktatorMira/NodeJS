import { User } from '../models/User';
import bcrypt from 'bcryptjs';

export const users: User[] = [];

export const registerUser = async (username: string, password: string): Promise<User> => {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) throw new Error('Пользователь с таким именем уже существует');

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
        username,
        password: hashedPassword,
    });
    return newUser;
};
export const findUserByUsername = async (username: string): Promise<User | null> => {
    return await User.findOne({ where: { username } });
};