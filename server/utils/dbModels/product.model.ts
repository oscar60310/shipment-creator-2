import { Table, Column, Model, HasOne, BelongsTo } from 'sequelize-typescript';
import User from './user.model';

@Table({ tableName: 'products' })
export default class Product extends Model<Product> {
  @Column({ primaryKey: true })
  id!: string;
  @Column
  displayId!: number;
  @Column
  name!: string;
  @Column
  unit!: string;
  @Column
  price!: number;
  @Column
  remark!: string;
  @Column
  enable!: boolean;
  @BelongsTo(() => User, 'modifyBy')
  modifyUser!: User;
}
