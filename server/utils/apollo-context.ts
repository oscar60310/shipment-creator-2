import { UserService } from 'server/services/userService';
import { TokenContent } from './auth';
import CustomerService from 'server/services/customerService';
import ProductService from 'server/services/productService';
import OrderService from 'server/services/orderService';
import ReportService from 'server/services/reportServices';
import { IConfig } from 'server/config';
import ProductSortService from 'server/services/productSortService';

export interface ApolloContext {
  config: IConfig;
  user: TokenContent;
  userService: UserService;
  customerService: CustomerService;
  productService: ProductService;
  orderService: OrderService;
  reportService: ReportService;
  productSortService: ProductSortService;
}
