"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user-model");
let Role = class Role extends sequelize_typescript_1.Model {
};
exports.Role = Role;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
], Role.prototype, "role_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
], Role.prototype, "role_name", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_model_1.User)
], Role.prototype, "users", void 0);
exports.Role = Role = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Roles', timestamps: false })
], Role);
