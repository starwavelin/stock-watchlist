import express, { Request, Response } from 'express';
import { HelloService } from '../services/hello.service';

export const helloRouter = express.Router();

const url = '/hello';

const helloService = new HelloService();

helloRouter.post(`${url}`, (req: Request, res: Response) => {
    try {
        const name = req.body.name || 'World';
        const outcome = helloService.post(name);
        return res.status(200).send(outcome);
    } catch (e) {
        res.status(500).send(`This endpoint encounters error ${e}`);
    }
});
