import { ApolloContext } from '../utils/apollo-context';
import dayjs from 'dayjs';
import OrderItem from '../utils/dbModels/orderItem.model';

export default class ReportResolver {
  public monthlyDetail = async (
    _root,
    { where: { month, customerId } },
    context: ApolloContext
  ) => {
    return await context.reportService.monthlyDetail(dayjs(month), customerId);
  };

  public byProductPrice = async (
    _root,
    { where: { month, customerId } },
    context: ApolloContext
  ) => {
    return await context.reportService.byProductAndPrice(
      dayjs(month),
      customerId
    );
  };
}
