import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  Default,
  AllowNull,
  AutoIncrement
} from 'sequelize-typescript';
import Order from './order.model';
import Product from './product.model';

@Table({ tableName: 'order_items' })
export default class OrderItem extends Model<OrderItem> {
  @AutoIncrement
  @Column({ primaryKey: true })
  id!: number;
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
