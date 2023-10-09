import express from 'express';
import { verifyToken } from '../middlewares';
import { tickerCompanyController } from '../controllers/ticker-company.controller';

export const tickerCompanyRouter = express.Router();

const url = '/tickers';

tickerCompanyRouter.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

tickerCompanyRouter.get(`${url}`, [verifyToken], tickerCompanyController.getTickerCompanyList);
