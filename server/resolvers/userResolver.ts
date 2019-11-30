import { UserService } from 'server/services/userService';
import { ApolloContext } from 'server/utils/apollo-context';

import { getToken } from '../utils/auth';

export default class UserResolver {
  constructor(private userService: UserService) {}

  public findMe = async (_root, _args, context: ApolloContext) => {
    const user = await context.userService.findOne(context.user.id);
    return user;
  };

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
    const { success, user } = await context.userService.login(
      username,
      password
    );
    if (!success || !user) return { success };
    const token = getToken(user);
    return {
      success,
      token
    };
  };
}
