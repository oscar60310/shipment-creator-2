import { ApolloServer } from 'apollo-server-koa';
import typeDefs from './graph-types';
import Koa from 'koa';
import { UserService } from '../services/userService';

const resolvers = {
  Query: {
    test: () => 'test'
  }
};

const userService = new UserService();

export const server = new ApolloServer({ typeDefs, resolvers });
export const app = new Koa();
server.applyMiddleware({ app });
