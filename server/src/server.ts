import * as dotenv from 'dotenv';
dotenv.config(); // This line needs to be called prior to other places using dotenv, ie. DB configuration
import cors from 'cors';
import express from 'express';
import cookieSession from 'cookie-session';
import { mysqlDB } from './databases/mysql.db';
import { helloRouter } from './routes/hello.router';
import { authRouter } from './routes/auth.router';
import { userRouter } from './routes/user.router';

/** Set the running port */
if (!process.env.SERVER_DOCKER_PORT) {
    console.log('The SERVER_DOCKER_PORT is not defined!');
    process.exit(1);
}
const port: number = parseInt(process.env.SERVER_DOCKER_PORT as string, 10);

/** Prepare app */

const app = express();

app.use(express.json()); // parse requests of content-type - application/json
app.use(cors());
app.use(
    cookieSession({
        name: 'xian-stock-watchlist-session',
        keys: ['COOKIE_SECRET'], // should use as secret environment variable
        httpOnly: true
    })
);

// Initialize Databases
mysqlDB.sequelize.sync();

/** Inject routers, prepend them with the '/api' keyword */
app.use('/api', helloRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);

/** Server activation */
app.listen(port, () => {
    console.log(`The Node server is listening on Port ${port}`);
});
