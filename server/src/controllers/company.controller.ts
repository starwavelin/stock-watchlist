import { Request, Response } from 'express';
import { tickerCompanyData } from '../server';

const getTickerCompanyList = (req: Request, res: Response) => {
    try {
        if (!tickerCompanyData) {
            res.status(400).send({ message: 'The ticker company list is not available right now.' });
        }
        return res.status(200).send(tickerCompanyData);
    } catch (e) {
        res.status(500).send('The process of getting ticker-company list erred out!');
    }
};

export const companyController = { getTickerCompanyList };
