import React, { CSSProperties } from 'react';
import { Tag, Colors } from '@blueprintjs/core';
import dayjs from 'dayjs';
import { OrderStatus } from '../../generated/globalTypes';
import { EditableOrderDetail } from './orderModel';
import { getOrderStatusTag } from '../../utilities/orderStatus';

const InfoBlock = (props: { title: string; children: React.ReactNode }) => {
  return (
    <div style={{ margin: 5, width: 'calc(30% - 30px)' }}>
      <div style={{ fontSize: 16 }}>
        <span
          style={{ marginRight: 10, color: Colors.COBALT1, fontWeight: 600 }}
        >
          {props.title}
        </span>
        <span>{props.children}</span>
      </div>
    </div>
  );
};

const rowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%'
};

const OrderDetail = (props: { order: EditableOrderDetail }) => {
  const { order } = props;
  const status = getOrderStatusTag(order);
  return (
    <>
      <div style={rowStyle}>
        <InfoBlock title="客戶名稱">{order.customer.name}</InfoBlock>
        <InfoBlock title="客戶地址">{order.customer.address}</InfoBlock>
      </div>
      <div style={rowStyle}>
        <InfoBlock title="訂單狀態">{status}</InfoBlock>
        <InfoBlock title="訂單日期">
          {dayjs(order.orderTime).format('YYYY - MM - DD')}
        </InfoBlock>
        <InfoBlock title="訂單編號">
          {order.orderNumber || '尚未取得'}
        </InfoBlock>
      </div>
    </>
  );
};

export default OrderDetail;
