import { Table, Column, Model, BelongsTo } from 'sequelize-typescript';
import Customer from './customer.model';
import Product from './product.model';

@Table({ tableName: 'product_sort' })
export default class ProductSort extends Model<ProductSort> {
  @Column({ primaryKey: true })
  id!: string;
  @Column
  customerId!: string;
  @BelongsTo(() => Customer, {
    foreignKey: 'customerId',
    onDelete: 'CASCADE'
  })
  customer!: string;
  @Column
  productId!: string;
  @BelongsTo(() => Product, {
    foreignKey: 'productId',
    onDelete: 'CASCADE'
  })
  product!: Product;
  @Column
  sort!: number;
}
