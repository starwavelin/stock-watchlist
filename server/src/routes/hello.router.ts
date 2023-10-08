import express from 'express';
import { sayHello } from '../controllers/hello.controller';

export const helloRouter = express.Router();

const url = '/hello';

helloRouter.post(`${url}`, sayHello);
