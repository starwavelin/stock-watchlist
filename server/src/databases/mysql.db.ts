import { config } from '../configs/mysql.config';
import { Sequelize } from 'sequelize';
import { defineUser } from '../models/user.model';

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: 'mysql',
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
