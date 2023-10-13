import * as dotenv from 'dotenv';
dotenv.config(); // This line needs to be called prior to other places using dotenv, ie. DB configuration
import cors from 'cors';
import express from 'express';
import cookieSession from 'cookie-session';
import { mysqlDB } from './databases/mysql.db';
import { mongoDB } from './databases/mongo.db';
import { authRouter } from './routes/auth.router';
import { userRouter } from './routes/user.router';
import {
    getTickerCompanyData,
    TickerCompanyDataType,
    Ticker_Company_Redis_Expiration
} from './services/getTickerCompanyData.service';
import { companyRouter } from './routes/company.router';
import { TickerPriceDataType, Ticker_Price_Redis_Expiration, getPricesData } from './services/getPrices.service';
import { tickerRouter } from './routes/ticker.router';
import { priceRouter } from './routes/price.router';

/** Set the running port */
if (!process.env.SERVER_DOCKER_PORT) {
    console.log('The SERVER_DOCKER_PORT is not defined!');
    process.exit(1);
}
const port: number = parseInt(process.env.SERVER_DOCKER_PORT as string, 10);

/** Prepare app */
const app = express();

app.use(express.json()); // parse requests of content-type - application/json
app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:4200'] // The URL for the Angular Client
    })
);
app.use(
    cookieSession({
        name: 'xian-stock-watchlist-session',
        keys: ['COOKIE_SECRET'], // should use as secret environment variable
        httpOnly: true
    })
);

// Initialize Necessary Data
export let tickerCompanyData: TickerCompanyDataType | null = null; // Generically available disregarding different sessions, reduce the number of hits to COMPANY_LIST_ENDPOINT
const initCompanyListData = async () => {
    tickerCompanyData = await getTickerCompanyData();
    console.log(`DEBUG: tickerCompanyData['AMZN'] ${tickerCompanyData['AMZN']}`);
};
initCompanyListData();
setInterval(initCompanyListData, Ticker_Company_Redis_Expiration * 1000); // Setup a timer to call initCompanyListData every day when the server is up. Unit: miliseconds

export let pricesData: TickerPriceDataType | null = null; // Generically available across sessions, reduce the number of hits to PRICES_ENDPOINT
const initPricesData = async () => {
    pricesData = await getPricesData();
    // console.log(`DEBUG: pricesData['AAPL'] ${pricesData['AAPL']}`);
};
initPricesData();
setInterval(initPricesData, Ticker_Price_Redis_Expiration * 1000); // Setup a timer to call initPricesData every 5 seconds when the server is up. Unit: miliseconds

// Initialize Databases
mysqlDB.sequelize.sync();
mongoDB.mongoose
    .connect(mongoDB.url)
    .then(() => {
        console.log('INFO: Connected to Mongo DB!');
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
        process.exit(1);
    });

/** Inject routers, prepend them with the '/api' keyword */
app.use('/api', authRouter);
app.use('/api', companyRouter);
app.use('/api', userRouter);
app.use('/api', tickerRouter);
app.use('/api', priceRouter);

/** Server activation */
app.listen(port, () => {
    console.log(`INFO: The Node server is listening on Port ${port}`);
});
