import dayjs from 'dayjs';
import { Op, fn, col } from 'sequelize';
import OrderItemDetail from '../utils/dbModels/orderItemDetail.model';

export default class ReportService {
  public monthlyDetail = async (month: dayjs.Dayjs, customerId: string) => {
    const result = await OrderItemDetail.findAll({
      where: {
        customerId: customerId,
        orderTime: {
          [Op.gt]: month.startOf('month').toDate(),
          [Op.lt]: month.endOf('month').toDate()
        }
      },
      order: ['orderTime']
    });
    return result;
  };

  public byProductAndPrice = async (month: dayjs.Dayjs, customerId: string) => {
    const group = ['customerId', 'productId', 'productName', 'unit', 'price'];
    const result = await OrderItemDetail.findAll({
      attributes: [...group, [fn('SUM', col('quantity')), 'quantity']],
      where: {
        customerId: customerId,
        orderTime: {
          [Op.gt]: month.startOf('month').toDate(),
          [Op.lt]: month.endOf('month').toDate()
        }
      },
      group,
      order: ['productId']
    });
    return result;
  };

  public byProduct = async (month: dayjs.Dayjs, customerId: string) => {
    const group = ['customerId', 'productId', 'productName', 'unit'];
    const result = await OrderItemDetail.findAll({
      attributes: [
        ...group,
        [fn('SUM', col('quantity')), 'quantity'],
        [fn('SUM', col('subTotal')), 'subTotal']
      ],
      where: {
        customerId: customerId,
        orderTime: {
          [Op.gt]: month.startOf('month').toDate(),
          [Op.lt]: month.endOf('month').toDate()
        }
      },
      group,
      order: ['productId']
    });
    return result;
  };
}
