import { ApolloContext } from 'server/utils/apollo-context';
import Order, { OrderStatus } from '../utils/dbModels/order.model';
import dayjs from 'dayjs';

export default class UserResolver {
  public createOne = async (_root, { data }, context: ApolloContext) => {
    const result = await context.orderService.createOne({
      ...data,
      modifyBy: context.user.id
    });
    return context.orderService.findOne(result.id);
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
    if (data.status === OrderStatus.CONFIRM) {
      data.orderNumber = this.generateOrderNumber(target);
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

  private generateOrderNumber = (data: Order) => {
    const time = dayjs(data.orderTime);
    return `${time.format('YYYY')}${data.id
      .substr(1, 3)
      .toUpperCase()}${Math.random()
      .toString(36)
      .substring(2, 4)
      .toUpperCase()}${data.customerId
      .substr(24, 3)
      .toUpperCase()}${time.format('MM')}${data.displayId
      .toString()
      .padStart(3, '0')}${time.format('DD')}`;
  };
}
