import React from 'react';
import { EditableOrderDetail } from './orderModel';
import { Button, Alert, Colors } from '@blueprintjs/core';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UPDATE_ORDER } from '../../queries/order';
import { updateOrder, updateOrderVariables } from '../../generated/updateOrder';
import { OrderStatus } from '../../generated/globalTypes';
import { GET_SYSTEM_INFO } from '../../queries/info';
import { systemInfo } from '../../generated/systemInfo';
import { createHalfA4Report } from '../../utilities/report/half-a4';
import { validateOrder, isOrderItemChange } from './orderValidator';
import { useDebounce } from '../../utilities/debounce';

enum EditorStatus {
  ERROR,
  LOADING,
  WARNING,
  SUCCESS
}

const getStatus = ({
  issues,
  orderUploaded
}: {
  issues: string[];
  orderUploaded: boolean;
}) => {
  if (issues.length > 0) {
    return {
      status: EditorStatus.ERROR,
      text: `發生問題: ${issues[0]}`
    };
  }
  if (!orderUploaded) {
    return {
      status: EditorStatus.WARNING,
      text: `訂單將在稍後儲存...`
    };
  }
  return {
    status: EditorStatus.SUCCESS,
    text: `一切就緒，訂單已經儲存`
  };
};

const getColor = (status: EditorStatus) => {
  switch (status) {
    case EditorStatus.ERROR:
      return Colors.RED2;
    case EditorStatus.LOADING:
      return Colors.GRAY1;
    case EditorStatus.SUCCESS:
      return Colors.GREEN2;
    case EditorStatus.WARNING:
      return Colors.ORANGE2;
  }
  return Colors.BLACK;
};

const useOrderChange = (func: () => void) => {
  const ref = React.useRef(null);
  return value => {
    if (ref.current && isOrderItemChange(ref.current, value)) {
      func();
    }
    ref.current = value;
  };
};

const OrderOperation = (props: { order: EditableOrderDetail }) => {
  const { order } = props;
  if (!order) return null;
  const readonly = order.status === OrderStatus.CONFIRM;
  const totalPrice = order.orderItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [orderUploaded, setOrderUploaded] = React.useState(true);
  const [updateOrder, { loading: updateLoading }] = useMutation<
    updateOrder,
    updateOrderVariables
  >(UPDATE_ORDER, {
    onCompleted: () => setOrderUploaded(true)
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const { data: config, loading: configLoading } = useQuery<systemInfo>(
    GET_SYSTEM_INFO
  );
  const [issues, setIssue] = React.useState<string[]>([]);

  const orderEdited = useDebounce(() => {
    if (
      !orderUploaded &&
      issues.length === 0 &&
      order.status === OrderStatus.DRAFT
    ) {
      updateOrderItem();
    }
  }, 5000);
  // order updated
  const checkOrder = useOrderChange(() => {
    setIssue(validateOrder(order));
    setOrderUploaded(false);
  });
  React.useEffect(() => checkOrder(order), [order]);
  React.useEffect(() => orderEdited(), [orderUploaded]);

  const { status, text } = getStatus({ issues, orderUploaded });
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
          status: OrderStatus.CONFIRM,
          orderItem: order.orderItem.map(item => ({
            price: item.price,
            quantity: item.quantity,
            productId: item.product.id
          }))
        }
      }
    });
  };
  const draftButtons = (
    <>
      <Button
        text="確認訂單"
        intent="warning"
        onClick={() => setConfirmDialogOpen(true)}
        loading={updateLoading}
        style={{ marginRight: 10 }}
        disabled={status === EditorStatus.ERROR}
      />
      <Button
        text="儲存"
        intent="success"
        onClick={updateOrderItem}
        loading={updateLoading}
        disabled={status === EditorStatus.ERROR}
      />
    </>
  );
  const readonlyButtons = (
    <>
      <Button
        text="列印"
        intent="success"
        onClick={() => {
          createHalfA4Report(order as any, config.systemInfo);
        }}
        loading={updateLoading}
        disabled={configLoading}
      />
    </>
  );
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
      <div
        style={{ width: '100%', textAlign: 'center', color: getColor(status) }}
      >
        {text}
      </div>
      <div style={{ width: '100%', textAlign: 'right' }}>
        {readonly ? readonlyButtons : draftButtons}
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
