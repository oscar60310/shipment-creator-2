import { UserService } from 'server/services/userService';
import { TokenContent } from './auth';
import CustomerService from 'server/services/customerService';
import ProductService from 'server/services/productService';
import OrderService from 'server/services/orderService';
import { IConfig } from 'server/config';

export interface ApolloContext {
  config: IConfig;
  user: TokenContent;
  userService: UserService;
  customerService: CustomerService;
  productService: ProductService;
  orderService: OrderService;
}
