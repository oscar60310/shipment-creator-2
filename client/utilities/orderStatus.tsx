import React from 'react';
import { orderList_orders } from '../generated/orderList';
import { OrderStatus } from '../generated/globalTypes';
import { Tag } from '@blueprintjs/core';

export const getOrderStatusTag = (order: orderList_orders): React.ReactNode => {
  let status: React.ReactNode;

  switch (order.status) {
    case OrderStatus.CONFIRM:
      status = <Tag intent="success">已確認</Tag>;
      break;
    case OrderStatus.DRAFT:
      status = <Tag intent="none">草稿</Tag>;
      break;
    case OrderStatus.ABANDON:
      status = <Tag intent="danger">棄用</Tag>;
      break;
    default:
      status = <Tag intent="none">{order.status}</Tag>;
      break;
  }

  return status;
};
