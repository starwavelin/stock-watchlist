import axios from 'axios';
import { getFromRedis, createRedisClient } from '../redis/redis.utils';
import { tickerCompanyData } from '../server';
import { getTickerCompanyData } from './getTickerCompanyData.service';

const PRICES_ENDPOINT_URL = process.env.PRICES_ENDPOINT_URL!;
const HEADER_KEY = process.env.API_HEADER_KEY!;
const HEADER_VAL = process.env.API_HEADER_VALUE;

const Ticker_Price_Redis_Key = 'tickerPrice';
export const Ticker_Price_Redis_Expiration = 5; // Refresh after 5 seconds

export type TickerPriceDataType = { [key: string]: number };

export const getPricesData = async (): Promise<TickerPriceDataType> => {
    // Try to get prices of all the available tickers from redis first
    const redisClient = await createRedisClient();
    const cachedPricesStr = await getFromRedis(Ticker_Price_Redis_Key, redisClient);

    if (cachedPricesStr) {
        return JSON.parse(cachedPricesStr);
    }

    // If not obtained from redis, call endpoint to get pricesData
    let companyListData = tickerCompanyData ? tickerCompanyData : await getTickerCompanyData(); // Just in case tickerCompanyData is not on the App Server's in-memory
    const tickers = Object.keys(companyListData).join();
    const response = await axios.get(`${PRICES_ENDPOINT_URL}?tickers=${tickers}`, {
        headers: { [HEADER_KEY]: HEADER_VAL }
    });
    const pricesData = response.data;

    // Store pricesData back to Redis
    const pricesDataStr = JSON.stringify(pricesData);
    await redisClient.set(Ticker_Price_Redis_Key, pricesDataStr, {
        EX: Ticker_Price_Redis_Expiration,
        NX: true
    });

    return pricesData;
};
