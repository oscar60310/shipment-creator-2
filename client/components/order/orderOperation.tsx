import React from 'react';
import { EditableOrderDetail } from './orderModel';
import { Button } from '@blueprintjs/core';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_ORDER } from '../../queries/order';
import { updateOrder, updateOrderVariables } from '../../generated/updateOrder';

const OrderOperation = (props: { order: EditableOrderDetail }) => {
  const { order } = props;
  if (!order) return null;
  const totalPrice = order.orderItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [updateOrder, { loading: updateLoading }] = useMutation<
    updateOrder,
    updateOrderVariables
  >(UPDATE_ORDER);
  const updateOrderItem = () => {
    updateOrder({
      variables: {
        id: order.id,
        data: {
          orderItem: order.orderItem.map(item => ({
            price: item.price,
            quantity: item.quantity,
            productId: item.product.id
          }))
        }
      }
    });
  };
  return (
    <div
      style={{
        height: 30,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{ fontSize: 20, width: '100%' }}>
        總金額 {totalPrice.toFixed(2)}
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>Status</div>
      <div style={{ width: '100%', textAlign: 'right' }}>
        <Button
          text="儲存"
          intent="success"
          onClick={updateOrderItem}
          loading={updateLoading}
        />
      </div>
    </div>
  );
};

export default OrderOperation;
