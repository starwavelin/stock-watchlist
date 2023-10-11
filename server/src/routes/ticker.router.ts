import express, { Request } from 'express';
import { verifyToken } from '../middlewares';
import { tickerController } from '../controllers/ticker.controller';

export const tickerRouter = express.Router();

const url = '/users/tickers';

tickerRouter.use((req: Request, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

tickerRouter.post(url, [verifyToken], tickerController.postTickersForUser);

tickerRouter.get(url, [verifyToken], tickerController.getTickersForUser);
