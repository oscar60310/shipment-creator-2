import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { orderDetail, orderDetailVariables } from '../../generated/orderDetail';
import { GET_ORDER_DETAIL } from '../../queries/order';
import { Divider, Spinner } from '@blueprintjs/core';
import OrderDetail from './detail';

const Order = () => {
  let { id } = useParams();
  const { data, loading } = useQuery<orderDetail, orderDetailVariables>(
    GET_ORDER_DETAIL,
    { variables: { id } }
  );

  return (
    <>
      <h2 className="bp3-heading">訂單資料</h2>
      <Divider />
      {loading ? (
        <Spinner size={50} intent="primary" />
      ) : (
        <>
          <OrderDetail order={data.order} />
          <Divider />
        </>
      )}
    </>
  );
};

export default Order;
