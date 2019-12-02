import { ApolloContext } from 'server/utils/apollo-context';
import { OrderStatus } from '../utils/dbModels/order.model';

export default class UserResolver {
  public createOne = async (_root, { data }, context: ApolloContext) => {
    return await context.orderService.createOne({
      ...data,
      modifyBy: context.user.id
    });
  };

  public findOne = async (_root, { id }, context: ApolloContext) => {
    const result = await context.orderService.findOne(id);
    return result;
  };

  public findAll = async (_root, { where }, context: ApolloContext) => {
    const result = await context.orderService.findAll(where);
    return result;
  };

  public updateOne = async (_root, { id, data }, context: ApolloContext) => {
    const target = await context.orderService.findOne(id);
    if (!target) {
      throw new Error('Order not found');
    }
    if (target.status === OrderStatus.CONFIRM) {
      throw new Error('Can not update CONFIRM orders');
    }
    const result = await context.orderService.updateOne(id, {
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
