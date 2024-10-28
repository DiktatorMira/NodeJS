"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user-model");
const ad_model_1 = require("./ad-model");
let Message = class Message extends sequelize_typescript_1.Model {
};
exports.Message = Message;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
], Message.prototype, "message_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false })
], Message.prototype, "sender_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false })
], Message.prototype, "receiver_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ad_model_1.Advertisement),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false })
], Message.prototype, "ad_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Message.prototype, "avatar", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT)
], Message.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE)
], Message.prototype, "upload_date", void 0);
exports.Message = Message = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Messages', timestamps: false })
], Message);
