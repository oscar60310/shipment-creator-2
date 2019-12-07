import {
  orderDetail_order,
  orderDetail_order_orderItem
} from '../../generated/orderDetail';

export interface EditableOrderDetail
  extends Omit<orderDetail_order, 'orderItem'> {
  orderItem: Partial<orderDetail_order_orderItem>[];
}
