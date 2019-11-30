import { ApolloContext } from 'server/utils/apollo-context';

export default class ProductResolver {
  public createOne = async (_root, { data }, context: ApolloContext) => {
    return await context.productService.createOne({
      ...data,
      modifyBy: context.user.id
    });
  };

  public findOne = async (_root, { id }, context: ApolloContext) => {
    const result = await context.productService.findOne(id);
    if (!result || !result.enable)
      throw new Error('Product not found or has been disabled');
    return result;
  };

  public findAll = async (_root, _, context: ApolloContext) => {
    const result = await context.productService.findAll();
    return result;
  };

  public updateOne = async (_root, { id, data }, context: ApolloContext) => {
    const result = await context.productService.updateOne(id, {
      ...data,
      modifyBy: context.user.id
    });
    return result;
  };

  public nested = () => ({
    modifyUser: async ({ modifyBy }, _args, context: ApolloContext) => {
      return await context.userService.findOne(modifyBy);
    }
  });
}
