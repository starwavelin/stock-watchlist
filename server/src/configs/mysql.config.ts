// Config params for MySQL DB

export const config = {
    HOST: 'localhost',
    DB: 'user-db',
    USER: 'mysql-root',
    PASSWORD: 'mysql123',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
