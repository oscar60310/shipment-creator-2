import { Sequelize } from 'sequelize-typescript';
import logger from './logger';
import User from './dbModels/user.model';
import Customer from './dbModels/customer.model';
import Product from './dbModels/product.model';
import Order from './dbModels/order.model';

const models = [User, Customer, Product, Order];

export const connect = async () => {
  const sequelize = new Sequelize({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    models
  });

  sequelize
    .authenticate()
    .then(() => logger.info('DB connect success'))
    .catch(e => logger.error('DB connect failed', e));

  sequelize.addModels(models);
};
