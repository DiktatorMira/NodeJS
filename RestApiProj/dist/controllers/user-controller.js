"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = void 0;
const user_model_1 = require("../models/user-model");
const role_model_1 = require("../models/role-model");
const createUser = async (req, res) => {
    try {
        const { role_id, email, hash_pass, name, avatar } = req.body;
        const newUser = await user_model_1.User.create({
            role_id,
            email,
            hash_pass,
            name,
            avatar,
            created_date: new Date(),
            last_activity: new Date(),
            status: true
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Ошибка при создании пользователя', error });
    }
};
exports.createUser = createUser;
const getUser = async (req, res) => {
    try {
        const user_id = req.params.id, user = await user_model_1.User.findByPk(user_id, { include: [role_model_1.Role] });
        if (user)
            res.status(200).json(user);
        else
            res.status(404).json({ message: 'Пользователь не найден!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Ошибка при получении пользователя', error });
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        const { role_id, email, name, avatar, status } = req.body;
        const user = await user_model_1.User.findByPk(req.params.id);
        if (user) {
            user.role_id = role_id || user.role_id;
            user.email = email || user.email;
            user.name = name || user.name;
            user.avatar = avatar || user.avatar;
            user.status = status !== undefined ? status : user.status;
            user.last_activity = new Date();
            await user.save();
            res.status(200).json(user);
        }
        else
            res.status(404).json({ message: 'Пользователь не найден!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении пользователя', error });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const user = await user_model_1.User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: 'Пользователь удален' });
        }
        else
            res.status(404).json({ message: 'Пользователь не найден!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении пользователя', error });
    }
};
exports.deleteUser = deleteUser;
