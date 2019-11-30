import User from '../utils/dbModels/user.model';
import * as crypto from 'crypto';
import * as uuid from 'uuid';

const SALT_STR = 'KDL';

export interface UserCreatOption {
  username: string;
  password: string;
}

export class UserService {
  constructor() {}

  public login = async (username: string, password: string) => {
    const user = await User.findOne({
      where: {
        username,
        password: this.passwordHash(username, password)
      }
    });
    return {
      success: !!user,
      user
    };
  };

  public findOne = async (id: string) => {
    return await User.findOne({
      attributes: ['id', 'username', 'enable', 'role'],
      where: { id }
    });
  };

  public createOne = async (opts: UserCreatOption) => {
    const user = await User.create({
      username: opts.username,
      password: this.passwordHash(opts.username, opts.password),
      id: uuid.v4(),
      enable: true,
      createAt: new Date(),
      updateAt: new Date(),
      role: 'ADMIN'
    });
    return user.id;
  };

  private passwordHash = (username: string, password: string) => {
    const hash = crypto.createHash('sha256');
    hash.update(`${username}${SALT_STR}${password}`);
    return hash.digest('hex');
  };
}
