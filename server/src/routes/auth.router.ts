import express, { Request } from 'express';
import { authController } from '../controllers/auth.controller';
import { checkDuplicateUsernameOrEmail } from '../middlewares';

export const authRouter = express.Router();

const url = '/auth';

authRouter.use((req: Request, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

authRouter.post(`${url}/register`, [checkDuplicateUsernameOrEmail], authController.register);
authRouter.post(`${url}/login`, authController.login);
authRouter.post(`${url}/logout`, authController.logout);
