import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  Default
} from 'sequelize-typescript';
import Order from './order.model';
import Product from './product.model';
import * as uuid from 'uuid';

@Table({ tableName: 'order_items' })
export default class OrderItem extends Model<OrderItem> {
  @Default(uuid.v4())
  @Column({ primaryKey: true })
  id!: string;
  @Column
  quantity!: number;
  @Column
  price!: number;
  @ForeignKey(() => Order)
  @Column
  orderId!: string;
  @BelongsTo(() => Product, 'productId')
  product!: Product;
}
