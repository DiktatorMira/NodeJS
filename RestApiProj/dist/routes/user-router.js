"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/', user_controller_1.createUser);
exports.userRouter.get('/:id', user_controller_1.getUser);
exports.userRouter.put('/:id', user_controller_1.updateUser);
exports.userRouter.delete('/:id', user_controller_1.deleteUser);
