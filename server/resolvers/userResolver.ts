import { UserService } from 'server/services/userService';
import { ApolloContext } from 'server/utils/apollo-context';

export default class UserResolver {
  constructor(private userService: UserService) {}

  public login = async (
    _root,
    {
      username,
      password
    }: {
      username: string;
      password: string;
    },
    context: ApolloContext
  ) => {
    return {
      success: false
    };
  };
}
