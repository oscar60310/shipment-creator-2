import { gql } from 'apollo-server-koa';

const typeDefs = gql`
  type Query {
    test: String
  }
`;

export default typeDefs;
