import { UserService } from 'server/services/userService';
import { TokenContent } from './auth';
import CustomerService from 'server/services/customerService';
import ProductService from 'server/services/productService';

export interface ApolloContext {
  user: TokenContent;
  userService: UserService;
  customerService: CustomerService;
  productService: ProductService;
}
