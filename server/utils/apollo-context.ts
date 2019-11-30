import { UserService } from 'server/services/userService';
import { TokenContent } from './auth';
import CustomerService from 'server/services/customerService';

export interface ApolloContext {
  user: TokenContent;
  userService: UserService;
  customerService: CustomerService;
}
