import axios from 'axios';
import { createRedisClient, getFromRedis } from '../redis/redis.utils';

const COMPANY_LIST_ENDPOINT_URL = process.env.COMPANY_LIST_ENDPOINT_URL!;
const HEADER_KEY = process.env.API_HEADER_KEY!;
const HEADER_VAL = process.env.API_HEADER_VALUE;

const Ticker_Company_Redis_Key = 'tickerCompany';
export const Ticker_Company_Redis_Expiration = 86400; // Refresh after one day, unit: seconds

export type TickerCompanyDataType = { [key: string]: string };

export const getTickerCompanyData = async (): Promise<TickerCompanyDataType> => {
    const redisClient = await createRedisClient();
    const cachedTickerCompanyStr = await getFromRedis(Ticker_Company_Redis_Key, redisClient);

    if (cachedTickerCompanyStr) {
        return JSON.parse(cachedTickerCompanyStr);
    }

    // If not obtained from redis, call endpoint to get TickerCompanyData
    const response = await axios.get(COMPANY_LIST_ENDPOINT_URL, {
        headers: { [HEADER_KEY]: HEADER_VAL }
    });
    const tickerCompanyData = response.data;

    // Store TickerCompanyData back to Redis
    const tickerDataStr = JSON.stringify(tickerCompanyData);
    await redisClient.set(Ticker_Company_Redis_Key, tickerDataStr, {
        EX: Ticker_Company_Redis_Expiration,
        NX: true
    });

    return tickerCompanyData;
};
