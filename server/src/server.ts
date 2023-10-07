import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { helloRouter } from './routes/hello.router';

/** Set the running port */

dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
const port: number = parseInt(process.env.PORT as string, 10);

/** Prepare app */

const app = express();

app.use(express.json());
app.use(cors());

/** Inject routers */
app.use('/api', helloRouter);

/** Server activation */
app.listen(port, () => {
    console.log(`The Node server is listening at Port ${port}`);
});
