import axios from 'axios';
import { createClient } from 'redis';

const TICKER_ENDPOINT_URL = process.env.TICKER_ENDPOINT_URL!;
const HEADER_KEY = process.env.API_HEADER_KEY!;
const HEADER_VAL = process.env.API_HEADER_VALUE;

const tickerCompanyRedisKey = 'tickerCompany';
const tickerCompanyExpiration = 86400; // Refresh after one day

export type TickerCompanyDataType = { [key: string]: string };

export const getTickerCompanyData = async (): Promise<TickerCompanyDataType> => {
    const tickerCompanyRedisClient = await createRedisClient();
    const cachedTickerCompanyStr = await getFromRedis(tickerCompanyRedisKey, tickerCompanyRedisClient);

    if (cachedTickerCompanyStr) {
        return JSON.parse(cachedTickerCompanyStr);
    }

    // If not obtained from redis, call endpoint to get TickerCompanyMap
    const response = await axios.get(TICKER_ENDPOINT_URL, {
        headers: { [HEADER_KEY]: HEADER_VAL }
    });
    const tickerCompanyData = response.data;

    // Store TickerCompanyMap back to Redis
    const tickerDataStr = JSON.stringify(tickerCompanyData);
    await tickerCompanyRedisClient.set(tickerCompanyRedisKey, tickerDataStr, {
        EX: tickerCompanyExpiration,
        NX: true
    });

    return tickerCompanyData;
};

const getFromRedis = async (key: string, client: any): Promise<string | null | undefined> => {
    try {
        return client.get(key);
    } catch (err) {
        console.log(`Error when reading the redis client to get ${key}`);
    }
};

const createRedisClient = async () => {
    const redisPort = process.env.REDIS_LOCAL_PORT;
    console.log(`INFO: The Redis is listening on Port ${redisPort}`);

    // In the following code, should set host to be 'redis' instead of 'localhost',
    // otherwise the localhost will always refer to the hostmachine or the server container itself.
    return await createClient({ socket: { host: 'redis', port: Number(redisPort) } })
        .on('error', (err) => console.log('Redis Client - tickerCompanyRedisClient errs out', err))
        .connect();
};
