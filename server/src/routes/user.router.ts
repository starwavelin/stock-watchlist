import express, { Request } from 'express';
import { userController } from '../controllers/user.controller';
import { verifyToken } from '../middlewares';

export const userRouter = express.Router();

const url = '/users';

userRouter.use((req: Request, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

userRouter.get(`${url}`, [verifyToken], userController.getUsers);
