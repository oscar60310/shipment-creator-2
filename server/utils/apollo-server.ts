import { ApolloServer, gql, AuthenticationError } from 'apollo-server-koa';
import { importSchema } from 'graphql-import';
import Koa from 'koa';
import { ApolloContext } from './apollo-context';
import { validateToken } from './auth';
import { mapValues } from 'lodash';
import { GraphQLDateTime } from 'graphql-iso-date';

import { UserService } from '../services/userService';
import CustomerService from '../services/customerService';
import ProductService from '../services/productService';

import UserResolver from '../resolvers/userResolver';
import CustomerResolver from '../resolvers/customerResolver';
import ProductResolver from '../resolvers/productResolver';

const typeDefs = gql(importSchema('server/graphql/index.graphql'));

// Services
const userService = new UserService();
const customerService = new CustomerService();
const productService = new ProductService();

// Resolvers
const userResolver = new UserResolver();
const customerResolver = new CustomerResolver();
const productResolver = new ProductResolver();

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
    product: productResolver.findOne,
    products: productResolver.findAll
  },
  Mutation: {
    createUser: userResolver.createOne,
    createCustomer: customerResolver.createOne,
    updateCustomer: customerResolver.updateOne,
    createProduct: productResolver.createOne,
    updateProduct: productResolver.updateOne
  },
  // Nested
  Customer: customerResolver.nested(),
  Product: productResolver.nested()
});

const resolversWithScalar = { ...resolvers, DateTime: GraphQLDateTime };

export const server = new ApolloServer({
  typeDefs,
  resolvers: resolversWithScalar,
  context: ({ ctx }) => {
    const token = ctx.header.authorization || '';
    let user;
    try {
      user = validateToken(token);
    } catch {}

    // develop mode
    if (!user && process.env.NODE_ENV === 'development') {
      user = {
        id: 'b6ddbc79-8709-49c6-a8a7-fc62a3869a25',
        role: 'ADMIN'
      };
    }

    return {
      user,
      userService,
      customerService,
      productService
    } as ApolloContext;
  }
});
export const app = new Koa();
server.applyMiddleware({ app });
