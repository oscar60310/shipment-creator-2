import { UserService } from "server/services/userService";

export interface ApolloContext {
  userService: UserService;
}