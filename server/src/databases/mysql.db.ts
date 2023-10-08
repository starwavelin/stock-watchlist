import { config } from '../configs/mysql.config';
import { Dialect, Sequelize } from 'sequelize';
import { defineUser } from '../models/user.model';

// console.log('===DEBUG===\n');
// console.log(`dbConfig.DB is ${config.DB},
//   dbConfig.USER is ${config.USER},
//   dbConfig.PASSWORD is ${config.PASSWORD}
//   dbConfig.HOST is ${config.HOST}
//   dbConfig.dialect is ${config.dialect}
//   dbConfig.port is ${config.port}`);

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
