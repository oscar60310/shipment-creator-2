import { Table, Column, Model, HasOne, BelongsTo } from 'sequelize-typescript';
import User from './user.model';

@Table({ tableName: 'customers' })
export default class Customer extends Model<Customer> {
  @Column({ primaryKey: true })
  id!: string;
  @Column
  name!: string;
  @Column
  address!: string;
  @Column
  modifyBy!: string;
  @Column
  phone!: string;
  @Column
  remark!: string;
  @Column
  enable!: boolean;
  @BelongsTo(() => User, 'modifyBy')
  modifyUser!: User;
}
