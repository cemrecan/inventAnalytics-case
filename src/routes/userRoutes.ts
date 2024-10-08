import express from 'express';
import { userController } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/users', userController.getAllUsers);

export default userRouter;