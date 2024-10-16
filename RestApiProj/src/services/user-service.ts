import { User } from '../models/users';
import bcrypt from 'bcryptjs';

export const users: User[] = [];

export const registerUser = (username: string, password: string): User => {
    const existingUser = users.find(user => user.username === username);
    if (existingUser) throw new Error('Пользователь с таким именем уже существует');

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser: User = {
        id: users.length + 1,
        username,
        password: hashedPassword,
    };

    users.push(newUser);
    return newUser;
};

export const findUserByUsername = (username: string): User | undefined => {
    return users.find(user => user.username === username);
};