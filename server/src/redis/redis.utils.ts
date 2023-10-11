import { createClient } from 'redis';

const REDIS_PORT = process.env.REDIS_LOCAL_PORT;

export const getFromRedis = async (key: string, client: any): Promise<string | null | undefined> => {
    try {
        return client.get(key);
    } catch (err) {
        console.log(`Error when reading the redis client to get ${key}`);
    }
};

let redisClient: any = null;
export const createRedisClient = async () => {
    if (!redisClient) {
        // In the following code, should set host to be 'redis' instead of 'localhost',
        // otherwise the localhost will always refer to the hostmachine or the server container itself.
        redisClient = await createClient({ socket: { host: 'redis', port: Number(REDIS_PORT) } })
            .on('error', (err) => console.log(`The creation of the Redis Client errs out`, err))
            .connect();
    }
    return redisClient;
};
