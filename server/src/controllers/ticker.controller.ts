import { Request, Response } from 'express';
import { UserTicker } from '../models/userTicker.model';
import { Ticker } from '../interfaces/userTicker.interface';

const postTickersForUser = async (req: Request, res: Response) => {
    try {
        console.log(`DEBUG: In the postTickersForUser() ftn, req.headers.userId is ${req.headers.userId}`);

        // Try to find the UserTicker record
        const userId = Number(req.headers.userId);
        const user = await UserTicker.findOne({ userId });
        const tickersToAdd: Ticker[] = req.body;

        if (user) {
            // reassign tickers field for the given user
            user.tickers.pull({}); // mongoose array is not a simple JS array so need to empty it this way
            user.tickers.push(...tickersToAdd);
            await user.save();
        } else {
            const newUser = new UserTicker({
                userId,
                tickers: tickersToAdd
            });
            await newUser.save();
        }

        return res.status(200).send({ message: `Tickers has been updated for User id: ${userId}` });
    } catch (e) {
        res.status(500).send('The process of posting tickers for a user erred out!');
    }
};

const getTickersForUser = async (req: Request, res: Response) => {
    try {
        console.log(`DEBUG: In the getTickersForUser() ftn, req.headers.userId is ${req.headers.userId}`);
        const userId = Number(req.headers.userId);
        const user = await UserTicker.findOne({ userId });

        if (!user) {
            res.status(400).send({ message: `Couldn't find user with userId: ${userId}` });
        }
        return res.status(200).send(user?.tickers as Ticker[]);
    } catch (e) {
        res.status(500).send('The process of getting tickers for a user erred out!');
    }
};

export const tickerController = { postTickersForUser, getTickersForUser };
