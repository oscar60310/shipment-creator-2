import { ApolloContext } from 'server/utils/apollo-context';

export default class UserResolver {
  public createOne = async (_root, { data }, context: ApolloContext) => {
    return await context.customerService.createOne({
      ...data,
      modifyBy: context.user.id
    });
  };

  public findOne = async (_root, { id }, context: ApolloContext) => {
    const result = await context.customerService.findOne(id);
    return result;
  };

  public updateOne = async (_root, { id, data }, context: ApolloContext) => {
    const result = await context.customerService.updateOne(id, {
      ...data,
      modifyBy: context.user.id
    });
    return result;
  };

  public nested = () => ({
    modifyBy: async ({ modifyBy }, _args, context: ApolloContext) => {
      return await context.userService.findOne(modifyBy);
    }
  });
}
