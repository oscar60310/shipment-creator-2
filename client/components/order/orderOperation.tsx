import React from 'react';
import { EditableOrderDetail } from './orderModel';
import { Button, Alert } from '@blueprintjs/core';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_ORDER } from '../../queries/order';
import { updateOrder, updateOrderVariables } from '../../generated/updateOrder';
import { OrderStatus } from '../../generated/globalTypes';

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
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
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
  const confirmOrder = () => {
    updateOrder({
      variables: {
        id: order.id,
        data: {
          status: OrderStatus.CONFIRM
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
          text="確認訂單"
          intent="warning"
          onClick={() => setConfirmDialogOpen(true)}
          loading={updateLoading}
          style={{ marginRight: 10 }}
        />
        <Button
          text="儲存"
          intent="success"
          onClick={updateOrderItem}
          loading={updateLoading}
        />
      </div>
      <Alert
        icon="saved"
        confirmButtonText="確定"
        cancelButtonText="取消"
        isOpen={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={confirmOrder}
        intent="danger"
      >
        <p>
          確認這筆訂單嗎? 訂單確認後將<b>無法</b>更改。
        </p>
      </Alert>
    </div>
  );
};

export default OrderOperation;
