import { Router } from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controllers/user-controller';

export const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/', getUsers);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);