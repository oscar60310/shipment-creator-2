import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export default class User extends Model<User> {
  @Column({ primaryKey: true })
  id!: string;
  @Column
  username!: string;
  @Column
  password!: string;
  @Column
  role!: string;
  @Column
  enable!: boolean;
}
