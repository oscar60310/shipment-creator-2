import {
  Table,
  Column,
  Model,
  BelongsTo,
  HasMany,
  ForeignKey
} from 'sequelize-typescript';
import User from './user.model';
import Customer from './customer.model';
import OrderItem from './orderItem.model';

export enum OrderStatus {
  DRAFT = 'DRAFT',
  CONFIRM = 'CONFIRM',
  ABANDON = 'ABANDON'
}

@Table({ tableName: 'orders' })
export default class Order extends Model<Order> {
  @Column({ primaryKey: true })
  id!: string;
  @Column
  displayId!: number;
  @BelongsTo(() => Customer, 'customerId')
  customer!: string;
  @Column
  status!: OrderStatus;
  @Column
  orderTime!: Date;
  @BelongsTo(() => User, 'modifyBy')
  modifyUser!: User;
  @Column
  remark!: string;
  @Column
  enable!: boolean;
  @HasMany(() => OrderItem)
  orderItem!: OrderItem[];
}
