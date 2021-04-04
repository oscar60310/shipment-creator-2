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

  public findAll = async (_root, _args, context: ApolloContext) => {
    const result = await context.customerService.findAll();
    return result;
  };

  public updateOne = async (_root, { id, data }, context: ApolloContext) => {
    const result = await context.customerService.updateOne(id, {
      ...data,
      modifyBy: context.user.id
    });
    return result;
  };

  public updateProductSort = async (
    _root,
    { id, data },
    context: ApolloContext
  ) => {
    await context.productSortService.updateOrCreate(
      id,
      data.productSorts.map((productId, index) => ({
        productId,
        sort: index,
        customerId: id
      }))
    );
    return await context.customerService.findOne(id);
  };

  public nested = () => ({
    modifyUser: async ({ modifyBy }, _args, context: ApolloContext) => {
      return await context.userService.findOne(modifyBy);
    },
    productSorts: async ({ id }, _args, context: ApolloContext) => {
      return await context.productSortService.find(id);
    }
  });
}
