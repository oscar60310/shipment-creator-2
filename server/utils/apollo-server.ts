import { ApolloServer, gql, AuthenticationError } from 'apollo-server-koa';
import { importSchema } from 'graphql-import';
import Koa from 'koa';
import { UserService } from '../services/userService';
import UserResolver from '../resolvers/userResolver';
import { ApolloContext } from './apollo-context';
import { validateToken } from './auth';
import { mapValues } from 'lodash';

const typeDefs = gql(importSchema('server/graphql/index.graphql'));

// Services
const userService = new UserService();

// Resolvers
const userResolver = new UserResolver(userService);

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
    login: userResolver.login
  }
});

export const server = new ApolloServer({
  typeDefs,
  resolvers,
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
      userService
    } as ApolloContext;
  }
});
export const app = new Koa();
server.applyMiddleware({ app });
