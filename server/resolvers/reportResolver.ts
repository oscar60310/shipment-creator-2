import { ApolloContext } from '../utils/apollo-context';
import dayjs from 'dayjs';

export default class ReportResolver {
  public monthlyDetail = async (
    _root,
    { where: { month, customerId } },
    context: ApolloContext
  ) => {
    return await context.reportService.monthlyDetail(
      dayjs(month).add(1, 'day'),
      customerId
    );
  };

  public byProductPrice = async (
    _root,
    { where: { month, customerId } },
    context: ApolloContext
  ) => {
    return await context.reportService.byProductAndPrice(
      dayjs(month).add(1, 'day'),
      customerId
    );
  };

  public byProduct = async (
    _root,
    { where: { month, customerId } },
    context: ApolloContext
  ) => {
    return await context.reportService.byProduct(
      dayjs(month).add(1, 'day'),
      customerId
    );
  };
}
