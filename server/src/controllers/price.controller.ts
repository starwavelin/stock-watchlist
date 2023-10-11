import { Request, Response } from 'express';
import { pricesData } from '../server';

const getPricesForUser = async (req: Request, res: Response) => {
    try {
        // extract query from the url
        const tickersStr = req.query.tickers;

        if (!tickersStr || typeof tickersStr !== 'string') {
            res.status(400).send('The tickers string must be provided as URL parameters to call this API!');
        }

        const tickers = (tickersStr as string).split(',');

        const prices = tickers.reduce<Record<string, any>>((acc, ticker) => {
            acc[ticker] = pricesData![ticker];
            return acc;
        }, {});

        return res.status(200).send(prices);
    } catch (e) {
        res.status(500).send('The process of getting prices for a user erred out!');
    }
};

export const priceController = { getPricesForUser };
