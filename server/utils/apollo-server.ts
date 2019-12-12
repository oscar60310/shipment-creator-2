import { ApolloServer, gql, AuthenticationError } from 'apollo-server-koa';
import { importSchema } from 'graphql-import';
import Koa from 'koa';
import * as path from 'path';
import { ApolloContext } from './apollo-context';
import { validateToken } from './auth';
import { mapValues } from 'lodash';
import { GraphQLDateTime } from 'graphql-iso-date';

import { UserService } from '../services/userService';
import CustomerService from '../services/customerService';
import ProductService from '../services/productService';
import OrderService from '../services/orderService';
import ReportService from '../services/reportServices';

import UserResolver from '../resolvers/userResolver';
import CustomerResolver from '../resolvers/customerResolver';
import ProductResolver from '../resolvers/productResolver';
import OrderResolver from '../resolvers/orderResolver';
import SystemInfoResolver from '../resolvers/systemInfoResolver';
import ReportResolver from '../resolvers/reportResolver';

import logger from './logger';
import config from '../config';

const typeDefs = gql(
  importSchema(path.join(__dirname, '..', 'graphql', 'index.graphql'))
);

// Services
const userService = new UserService();
const customerService = new CustomerService();
const productService = new ProductService();
const orderService = new OrderService();
const reportService = new ReportService();

// Resolvers
const userResolver = new UserResolver();
const customerResolver = new CustomerResolver();
const productResolver = new ProductResolver();
const orderResolver = new OrderResolver();
const systemInfoResolver = new SystemInfoResolver();
const reportResolver = new ReportResolver();

const authenticator = next => (root, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError('Unauthenticated');
  }

  return next(root, args, context, info);
};

const withAuthenticator = resolvers => {
  const operationMapping = operationType =>
    mapValues(operationType, (operation, operationName) => {
      switch (operationName) {
        case 'login':
          return operation;
        default:
          return authenticator(operation);
      }
    });
  return mapValues(resolvers, operationMapping);
};

const resolvers = withAuthenticator({
  Query: {
    me: userResolver.findMe,
    login: userResolver.login,
    customer: customerResolver.findOne,
    customers: customerResolver.findAll,
    product: productResolver.findOne,
    products: productResolver.findAll,
    order: orderResolver.findOne,
    orders: orderResolver.findAll,
    systemInfo: systemInfoResolver.getConfig,
    monthlyDetailReport: reportResolver.monthlyDetail,
    byProductPriceReport: reportResolver.byProductPrice
  },
  Mutation: {
    createUser: userResolver.createOne,
    createCustomer: customerResolver.createOne,
    updateCustomer: customerResolver.updateOne,
    createProduct: productResolver.createOne,
    updateProduct: productResolver.updateOne,
    createOrder: orderResolver.createOne,
    updateOrder: orderResolver.updateOne
  },
  // Nested
  Customer: customerResolver.nested(),
  Product: productResolver.nested(),
  Order: orderResolver.nested()
});

const resolversWithScalar = { ...resolvers, DateTime: GraphQLDateTime };

export const server = new ApolloServer({
  typeDefs,
  resolvers: resolversWithScalar,
  context: ({ ctx }) => {
    // Remove auth validation in beta
    // const token = ctx.header.authorization || '';
    // let user;
    // try {
    //   user = validateToken(token);
    // } catch {}

    // // develop mode
    // if (!user && process.env.NODE_ENV === 'development') {
    //   user = {
    //     id: 'b6ddbc79-8709-49c6-a8a7-fc62a3869a25',
    //     role: 'ADMIN'
    //   };
    // }
    const user = {
      id: 'b6ddbc79-8709-49c6-a8a7-fc62a3869a25',
      role: 'ADMIN'
    };

    return {
      user,
      userService,
      customerService,
      productService,
      orderService,
      reportService,
      config
    } as ApolloContext;
  }
});

export const startServer = async () => {
  const app = new Koa();
  server.applyMiddleware({ app });

  if (process.env.NODE_ENV === 'development') {
    logger.info('Start koa webpack');
    const koaWebpack = require('koa-webpack');
    const config = require('../../webpack.config');
    const middleware = await koaWebpack({
      config,
      devMiddleware: {
        publicPath: '/'
      }
    });
    app.use(middleware);
  } else {
    const staticPath = path.join(__dirname, '..', '..', 'static');
    logger.info(`Using ${staticPath} as static file folder`);
    app.use(require('koa-static')(staticPath));
  }
  return app;
};
