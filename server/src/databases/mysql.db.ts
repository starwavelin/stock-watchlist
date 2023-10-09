import { config } from '../configs/mysql.config';
import { Dialect, Sequelize } from 'sequelize';
import { defineUser } from '../models/user.model';

const sequelize = new Sequelize(config.DB as string, config.USER as string, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect as Dialect,
    port: parseInt(config.port as string),
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});

const user = defineUser(sequelize);

export const mysqlDB = {
    Sequelize,
    sequelize,
    user
};
