"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Role_1 = require("./Role");
const Message_1 = require("./Message");
const Advertisement_1 = require("./Advertisement");
const PasswordReset_1 = require("./PasswordReset");
let User = class User extends sequelize_typescript_1.Model {
};
exports.User = User;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
], User.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Role_1.Role),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false })
], User.prototype, "role_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], User.prototype, "hash_pass", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], User.prototype, "avatar", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE)
], User.prototype, "created_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE)
], User.prototype, "last_activity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: false })
], User.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Message_1.Message)
], User.prototype, "messages", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Advertisement_1.Advertisement)
], User.prototype, "advertisements", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => PasswordReset_1.PasswordReset)
], User.prototype, "passwords_reset", void 0);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Users', timestamps: false })
], User);
