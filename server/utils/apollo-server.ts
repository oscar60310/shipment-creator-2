import { ApolloServer, gql, AuthenticationError } from 'apollo-server-koa';
import { importSchema } from 'graphql-import';
import Koa from 'koa';
import { ApolloContext } from './apollo-context';
import { validateToken } from './auth';
import { mapValues } from 'lodash';
import { GraphQLDateTime } from 'graphql-iso-date';
import { UserService } from '../services/userService';
import CustomerService from '../services/customerService';
import UserResolver from '../resolvers/userResolver';
import CustomerResolver from '../resolvers/customerResolver';

const typeDefs = gql(importSchema('server/graphql/index.graphql'));

// Services
const userService = new UserService();
const customerService = new CustomerService();

// Resolvers
const userResolver = new UserResolver();
const customerResolver = new CustomerResolver();

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
    customer: customerResolver.findOne
  },
  Mutation: {
    createUser: userResolver.createOne,
    createCustomer: customerResolver.createOne,
    updateCustomer: customerResolver.updateOne
  },
  // Nested
  Customer: customerResolver.nested()
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
      customerService
    } as ApolloContext;
  }
});
export const app = new Koa();
server.applyMiddleware({ app });
