import { ApolloContext } from '../utils/apollo-context';

export default class SystemInfoResolver {
  public getConfig(_: any, __: any, { config }: ApolloContext) {
    return config;
  }
}
