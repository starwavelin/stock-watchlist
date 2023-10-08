// Config params for MySQL DB

export const config = {
    HOST: process.env.MYSQL_DB_HOST,
    USER: process.env.MYSQL_DB_USER,
    PASSWORD: process.env.MYSQL_DB_PASSWORD,
    DB: process.env.MYSQL_DB_NAME,
    port: process.env.MYSQL_DB_PORT,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
