import User from '../utils/dbModels/user.model';
import * as crypto from 'crypto';

const SALT_STR = 'KDL';

export class UserService {
  constructor() { }

  public login = async (username: string, password: string) => {
    const user = await User.findOne({
      where: {
        username,
        password: this.passwordHash(username, password)
      }
    });
    return {
      success: !!user, user
    }
  };

  private passwordHash = (username: string, password: string) => {
    const hash = crypto.createHash('sha256');
    hash.update(`${username}${SALT_STR}${password}`);
    return hash.digest('hex');
  };
}
