import express from 'express';
import { verifyToken } from '../middlewares';
import { companyController } from '../controllers/company.controller';

export const companyRouter = express.Router();

const url = '/companies';

companyRouter.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

companyRouter.get(`${url}`, [verifyToken], companyController.getTickerCompanyList);
