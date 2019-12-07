import { Sequelize } from 'sequelize-typescript';
import logger from './logger';
import User from './dbModels/user.model';
import Customer from './dbModels/customer.model';
import Product from './dbModels/product.model';
import Order from './dbModels/order.model';
import OrderItem from './dbModels/orderItem.model';
import config from '../config';

const models = [User, Customer, Product, Order, OrderItem];

export const sequelize = new Sequelize({
  host: config.dbHost || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: 'postgres',
  username: config.dbUser,
  password: config.dbPass,
  database: config.dbName,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  models
});

export const connect = async () => {
  sequelize
    .authenticate()
    .then(() => logger.info('DB connect success'))
    .catch(e => logger.error('DB connect failed', e));

  sequelize.addModels(models);
};
