const { MONGO_DB_HOST, MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_NAME, MONGO_DB_PORT } = process.env;

export const url = `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}?authSource=admin`;
