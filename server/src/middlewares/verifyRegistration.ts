import { NextFunction, Request, Response } from 'express';
import { mysqlDB as db } from '../databases/mysql.db';

const User = db.user;

export const checkDuplicateUsernameOrEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check for duplicate username
        const userByUsername = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (userByUsername) {
            res.status(400).send({
                message: 'Failed! Username is already in use!'
            });
            return;
        }

        // Check for duplicate email
        const userByEmail = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (userByEmail) {
            res.status(400).send({
                message: 'Failed! Email is already in use!'
            });
            return;
        }

        next();
    } catch (error) {
        res.status(500).send({
            message: 'An error occurred while checking for duplicate username or email.'
        });
    }
};
