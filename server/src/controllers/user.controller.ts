import { Request, Response } from 'express';
import { mysqlDB as db } from '../databases/mysql.db';

const User = db.user;

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        return res.status(200).send(users);
    } catch (e) {
        res.status(500).send('The get Users process erred out!');
    }
};

export const userController = { getAllUsers };
