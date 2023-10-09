import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { config } from '../configs/auth.config';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.session?.token;

    if (!token) {
        return res.status(403).send({ message: 'Forbidden! No token provided!' });
    }

    jwt.verify(token, config.secret, (err: any, decodedHeaders: any) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized!'
            });
        }
        console.log(`DEBUG: the decodedHeaders.id is ${decodedHeaders.id}`);
        req.headers.userId = decodedHeaders.id;
        console.log(`DEBUG: the req.headers.userId is ${req.headers.userId}`);
        next();
    });
};
