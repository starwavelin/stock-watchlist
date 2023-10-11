import express, { Request } from 'express';
import { userController } from '../controllers/user.controller';
import { verifyToken } from '../middlewares';

export const userRouter = express.Router();

const url = '/users';

userRouter.use((req: Request, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

// This endpoint is for testing purpose only. In the real world, only Admin may have access to all users' profile data
userRouter.get(`${url}`, [verifyToken], userController.getAllUsers);
