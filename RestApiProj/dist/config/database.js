"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../models/user-model");
const role_model_1 = require("../models/role-model");
const ad_model_1 = require("../models/ad-model");
const category_model_1 = require("../models/category-model");
const message_model_1 = require("../models/message-model");
const passwordReset_model_1 = require("../models/passwordReset-model");
require("dotenv/config");
exports.connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [user_model_1.User, role_model_1.Role, ad_model_1.Advertisement, category_model_1.Category, message_model_1.Message, passwordReset_model_1.PasswordReset],
});
