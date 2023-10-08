import { Request, Response } from 'express';
import { HelloService } from '../services/hello.service';

const helloService = new HelloService();

export const sayHello = (req: Request, res: Response) => {
    try {
        const name = req.body.name || "Coding's Website";
        const outcome = helloService.post(name);
        return res.status(200).send(outcome);
    } catch (e) {
        res.status(500).send(`This endpoint encounters error ${e}`);
    }
};
