import * as uuid from 'uuid';
import Order, { OrderStatus } from '../utils/dbModels/order.model';
import { Op } from 'sequelize';

export default class OrderService {
  public createOne = async (data: Partial<Order>) => {
    return await Order.create({
      ...data,
      enable: true,
      id: uuid.v4(),
      status: OrderStatus.DRAFT
    });
  };

  public updateOne = async (id: string, data: Partial<Order>) => {
    const [updateCount, products] = await Order.update(data, {
      returning: true,
      where: { id }
    });
    if (updateCount === 0) throw new Error('Update product failed');
    return products[0];
  };

  public findOne = async (id: string) => {
    return await Order.findOne({ where: { id } });
  };

  public findAll = async (where: {
    orderTime_gt: Date;
    orderTime_lt: Date;
  }) => {
    return await Order.findAll({
      where: {
        enable: true,
        orderTime: {
          [Op.gt]: where.orderTime_gt,
          [Op.lt]: where.orderTime_lt
        }
      },
      order: [['orderTime', 'desc']]
    });
  };
}
