import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../configs/auth.config';
import { mysqlDB as db } from '../databases/mysql.db';
import * as bcrypt from 'bcryptjs';
import { UserData } from '../models/user.model';

const User = db.user;

const register = async (req: Request, res: Response) => {
    try {
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        return res
            .status(200)
            .send({ message: `A new user with username=${req.body.username} was created successfully!` });
    } catch (e) {
        res.status(500).send('The registration process erred out!');
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const user = (await User.findOne({
            where: { username: req.body.username }
        })) as UserData | null;

        // handle if username not found
        if (!user) {
            return res.status(404).send({ message: 'User Not found.' });
        }

        // handle password doesn't match
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid Password!' });
        }

        // Sign the payload to form a token
        const token = jwt.sign({ id: user.id }, config.secret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 30 * 60 // 30 mins
        });

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email
        });

        return res.status(200).send();
    } catch (e) {
        res.status(500).send('The login process erred out!');
    }
};

/**
 * Note: for implificity I didn't implement logout based on
 * `expiresIn` time
 */
const logout = (req: Request, res: Response) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been successfully logged out!" });
    } catch (e) {
        res.status(500).send('The logout process erred out!');
    }
};

export const authController = { register, login, logout };
