import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import * as uuid from 'uuid';
import {
  orderDetail,
  orderDetailVariables,
  orderDetail_order,
  orderDetail_order_orderItem
} from '../../generated/orderDetail';
import { GET_ORDER_DETAIL } from '../../queries/order';
import { Divider, Spinner, Button } from '@blueprintjs/core';
import OrderDetail from './detail';
import OrderItem from './orderItem';
import { EditableOrderDetail } from './orderModel';

const Order = () => {
  let { id } = useParams();
  const [orderData, setOrderData] = useState<EditableOrderDetail>();
  const { data, loading } = useQuery<orderDetail, orderDetailVariables>(
    GET_ORDER_DETAIL,
    { variables: { id } }
  );
  useEffect(() => {
    if (!data || !data.order) return;
    setOrderData(data.order);
  }, [data]);
  const updateOrderItem = (updatedItem: orderDetail_order_orderItem) => {
    const index = orderData.orderItem.findIndex(
      item => item.id === updatedItem.id
    );
    const orderItem = Object.assign([], orderData.orderItem, {
      [index]: updatedItem
    });
    setOrderData({
      ...orderData,
      orderItem
    });
  };
  const addOrderItem = () => {
    const emptyItem = {
      id: uuid.v4(),
      price: 0,
      quantity: 0
    };
    setOrderData({
      ...orderData,
      orderItem: [...orderData.orderItem, emptyItem]
    });
  };
  const deleteOrderItem = (deletedItem: orderDetail_order_orderItem) => {
    setOrderData({
      ...orderData,
      orderItem: orderData.orderItem.filter(item => item.id !== deletedItem.id)
    });
  };
  const orderItemOperation = () => {
    if (!orderData) return <Spinner size={50} intent="primary" />;
    return (
      <>
        <OrderDetail order={orderData} />
        <Divider />
        <Button text="新增項目" onClick={addOrderItem} icon="plus" />
        <table className="bp3-html-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>產品</th>
              <th>單位</th>
              <th>單價</th>
              <th>數量</th>
              <th>小計</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {orderData.orderItem.map(item => (
              <OrderItem
                data={item}
                key={item.id}
                onUpdate={updateOrderItem}
                onDelete={deleteOrderItem}
              />
            ))}
          </tbody>
        </table>
      </>
    );
  };
  return (
    <>
      <h2 className="bp3-heading">訂單資料</h2>
      <Divider />
      {orderItemOperation()}
    </>
  );
};

export default Order;
