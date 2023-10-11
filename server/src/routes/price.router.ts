import express, { Request } from 'express';
import { verifyToken } from '../middlewares';
import { priceController } from '../controllers/price.controller';

export const priceRouter = express.Router();

const url = '/users/prices';

priceRouter.use((req: Request, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

priceRouter.get(url, [verifyToken], priceController.getPricesForUser);
