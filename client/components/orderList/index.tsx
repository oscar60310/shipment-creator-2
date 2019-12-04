import React from 'react';
import MonthPicker, { TimeRange } from './monthPicker';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_ORDER_LIST } from '../../queries/order';
import { orderList, orderListVariables } from '../../generated/orderList';

const OrderList = () => {
  const [loadOrders, { data: orders }] = useLazyQuery<
    orderList,
    orderListVariables
  >(GET_ORDER_LIST);

  const onSelectMonth = (range: TimeRange) => {
    loadOrders({
      variables: {
        where: {
          orderTime_gt: range.gt,
          orderTime_lt: range.lt
        }
      }
    });
  };
  console.log(orders);
  return (
    <>
      <h2 className="bp3-heading">訂單列表</h2>
      <MonthPicker onSelect={onSelectMonth} />
    </>
  );
};

export default OrderList;
