import React from 'react';
import MonthPicker, { TimeRange } from './monthPicker';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { GET_ORDER_LIST, CREATE_ORDER } from '../../queries/order';
import { orderList, orderListVariables } from '../../generated/orderList';
import OrderTable from './orderTable';
import { Button } from '@blueprintjs/core';
import CustomDialog from '../customDialog';
import OrderCreator from '../order/orderCreator';
import { createOrderVariables, createOrder } from '../../generated/createOrder';
import { Redirect } from 'react-router';

const OrderList = () => {
  const [loadOrders, { data: orderQuery }] = useLazyQuery<
    orderList,
    orderListVariables
  >(GET_ORDER_LIST);
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [createData, setCreateData] = React.useState<createOrderVariables>(
    null
  );
  const [createError, setCreateError] = React.useState(null);
  const [redirectToOrder, setRedirectToOrder] = React.useState<string>(null);

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

  const [createOrderRequest, { loading: createLoading }] = useMutation<
    createOrder,
    createOrderVariables
  >(CREATE_ORDER, {
    onCompleted: data => setRedirectToOrder(data.createOrder.id),
    onError: error => setCreateError(error.message)
  });
  if (redirectToOrder) {
    return <Redirect to={`/order/${redirectToOrder}`} />;
  }
  return (
    <>
      <h2 className="bp3-heading">訂單列表</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}
      >
        <MonthPicker onSelect={onSelectMonth} />
        <Button
          text="建立新訂單"
          icon="plus"
          onClick={() => setCreateDialogOpen(true)}
        />
      </div>
      {orderQuery && <OrderTable orders={orderQuery.orders} />}
      <CustomDialog
        isOpen={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        footer={
          <Button
            minimal
            onClick={() => {
              createOrderRequest({ variables: createData });
            }}
            loading={createLoading}
            disabled={!createData}
          >
            建立
          </Button>
        }
        content={<OrderCreator onSuccess={setCreateData} error={createError} />}
        title="建立新訂單"
      />
    </>
  );
};

export default OrderList;
