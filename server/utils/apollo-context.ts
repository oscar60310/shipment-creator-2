import { UserService } from 'server/services/userService';
import { TokenContent } from './auth';

export interface ApolloContext {
  user: TokenContent;
  userService: UserService;
}
