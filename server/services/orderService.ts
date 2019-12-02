import * as uuid from 'uuid';
import Order, { OrderStatus } from '../utils/dbModels/order.model';
import { Op } from 'sequelize';
import Customer from '../utils/dbModels/customer.model';
import OrderItem from '../utils/dbModels/orderItem.model';
import User from '../utils/dbModels/user.model';
import Product from '../utils/dbModels/product.model';
import { sequelize } from '../utils/db';

export default class OrderService {
  public createOne = async (data: Partial<Order>) => {
    return await Order.create(
      {
        ...data,
        enable: true,
        id: uuid.v4(),
        status: OrderStatus.DRAFT
      },
      { include: [OrderItem] }
    );
  };

  public updateOne = async (id: string, data: Partial<Order>) => {
    const { orderItem } = data;
    if (orderItem) {
      await sequelize.transaction(t =>
        OrderItem.destroy({
          where: { orderId: id },
          transaction: t
        }).then(() =>
          OrderItem.bulkCreate(
            orderItem.map(item => ({ ...item, orderId: id })),
            {
              transaction: t
            }
          )
        )
      );
    }

    const [updateCount] = await Order.update(data, {
      returning: false,
      where: { id }
    });
    if (updateCount === 0) throw new Error('Update product failed');
    return await this.findOne(id);
  };

  public findOne = async (id: string) => {
    return await Order.findOne({
      where: { id },
      include: [{ model: Customer }, { model: OrderItem, include: [Product] }]
    });
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
      order: [['orderTime', 'desc']],
      include: [{ model: Customer }, { model: OrderItem, include: [Product] }]
    });
  };
}
