import React from 'react';
import MonthPicker, { monthList } from '../../utilities/monthPicker';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_ORDER_LIST, CREATE_ORDER } from '../../queries/order';
import { orderList, orderListVariables } from '../../generated/orderList';
import OrderTable from './orderTable';
import { Button, Spinner } from '@blueprintjs/core';
import CustomDialog from '../customDialog';
import OrderCreator from '../order/orderCreator';
import { createOrderVariables, createOrder } from '../../generated/createOrder';
import { useHistory } from 'react-router';

const OrderList = () => {
  const [timeRange, setTimeRange] = React.useState(monthList[0].value);
  const { data: orderQuery, loading: ordersLoading } = useQuery<
    orderList,
    orderListVariables
  >(GET_ORDER_LIST, {
    variables: {
      where: {
        orderTime_gt: timeRange.gt,
        orderTime_lt: timeRange.lt
      }
    },
    fetchPolicy: 'no-cache'
  });

  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [createData, setCreateData] = React.useState<createOrderVariables>(
    null
  );
  const [createError, setCreateError] = React.useState(null);

  const history = useHistory();
  const [createOrderRequest, { loading: createLoading }] = useMutation<
    createOrder,
    createOrderVariables
  >(CREATE_ORDER, {
    onCompleted: async data => {
      history.push(`/order/${data.createOrder.id}`);
    },
    onError: error => setCreateError(error.message)
  });

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
        <MonthPicker onSelect={setTimeRange} />
        <Button
          text="建立新訂單"
          icon="plus"
          onClick={() => setCreateDialogOpen(true)}
        />
      </div>
      {ordersLoading && <Spinner />}
      {orderQuery && !ordersLoading && (
        <OrderTable orders={orderQuery.orders} />
      )}
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
