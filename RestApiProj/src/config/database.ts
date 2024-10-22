import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Role } from '../models/Role';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [User, Role]
});