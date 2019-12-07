export interface EditableOrderDetail
  extends Omit<orderDetail_order, 'orderItem'> {
  orderItem: Partial<orderDetail_order_orderItem>[];
}
