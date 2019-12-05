import React from 'react';
import { orderList_orders } from '../../generated/orderList';
import dayjs from 'dayjs';
import { OrderStatus } from '../../generated/globalTypes';
import { Tag } from '@blueprintjs/core';

const OrderTable = (props: { orders: orderList_orders[] }) => {
  const orderRow = (order: orderList_orders) => {
    const orderTime = dayjs(order.orderTime);
    const status =
      order.status === OrderStatus.CONFIRM ? (
        <Tag intent="success">已確認</Tag>
      ) : (
        <Tag intent="none">草稿</Tag>
      );
    return (
      <tr key={order.id}>
        <td>{order.displayId}</td>
        <td>{status}</td>
        <td>{orderTime.format('YYYY-MM-DD')}</td>
        <td>{order.customer.name}</td>
        <td>{order.orderNumber || '-'}</td>
      </tr>
    );
  };
  return (
    <table className="bp3-html-table bp3-interactive" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>編號</th>
          <th>訂單狀態</th>
          <th>日期</th>
          <th>客戶</th>
          <th>訂單編號</th>
        </tr>
      </thead>
      <tbody>{props.orders.map(orderRow)}</tbody>
    </table>
  );
};

export default OrderTable;
