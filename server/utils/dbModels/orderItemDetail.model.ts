import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  AutoIncrement
} from 'sequelize-typescript';

// View table
@Table({ tableName: 'order_tem_detail', timestamps: false })
export default class OrderItemDetail extends Model<OrderItemDetail> {
  @Column
  orderId!: string;
  @Column
  orderNumber!: string;
  @Column
  orderTime!: Date;
  @Column
  customerId!: string;
  @Column
  productName!: string;
  @Column
  productId!: string;
  @Column
  unit!: string;
  @Column
  price!: number;
  @Column
  quantity!: number;
  @Column
  subTotal!: number;
}
