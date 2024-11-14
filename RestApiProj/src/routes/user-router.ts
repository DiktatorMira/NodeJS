import { Router } from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/user-controller';
import { verifyAdmin } from '../middlewares/auth-middleware';

export const userRouter = Router();

userRouter.post('/', verifyAdmin, createUser);
userRouter.get('/:id', getUser);
userRouter.put('/:id', verifyAdmin, updateUser);
userRouter.delete('/:id', deleteUser);