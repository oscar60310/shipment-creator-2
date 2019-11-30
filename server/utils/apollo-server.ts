import { ApolloServer, gql } from 'apollo-server-koa';
import { importSchema } from 'graphql-import';
import Koa from 'koa';
import { UserService } from '../services/userService';
import UserResolver from '../resolvers/userResolver';

const typeDefs = gql(importSchema('server/graphql/index.graphql'));

// Services
const userService = new UserService();

// Resolvers
const userResolver = new UserResolver(userService);

const resolvers = {
  Query: {
    login: userResolver.login
  }
};
export const server = new ApolloServer({ typeDefs, resolvers });
export const app = new Koa();
server.applyMiddleware({ app });
