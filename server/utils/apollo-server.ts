import { ApolloServer } from 'apollo-server-koa';
import typeDefs from './graph-types';
import Koa from 'koa';

const resolvers = {
  Query: {
    test: () => 'test'
  }
};

export const server = new ApolloServer({ typeDefs, resolvers });
export const app = new Koa();
server.applyMiddleware({ app });
