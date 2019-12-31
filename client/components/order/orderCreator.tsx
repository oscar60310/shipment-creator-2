import React from 'react';
import { FormGroup, Callout } from '@blueprintjs/core';
import { customers_customers } from '../../generated/customers';
import { DateInput } from '@blueprintjs/datetime';
import dayjs from 'dayjs';
import { createOrderVariables } from '../../generated/createOrder';
import CustomerSelector from '../../utilities/customerSelect';

const OrderCreator = (props: {
  onSuccess?: (data: createOrderVariables) => void;
  error?: any;
}) => {
  const { onSuccess, error } = props;
  const [customerSelected, setCustomerSelected] = React.useState<
    customers_customers
  >(null);
  const [orderTime, setOrderTime] = React.useState(new Date());

  React.useEffect(() => {
    if (customerSelected && orderTime && onSuccess) {
      onSuccess({
        data: {
          customerId: customerSelected.id,
          orderTime
        }
      });
    }
  }, [customerSelected, orderTime]);

  return (
    <>
      <FormGroup label="客戶">
        <CustomerSelector onSelect={setCustomerSelected} />
      </FormGroup>
      <FormGroup label="訂單時間">
        <DateInput
          formatDate={date => dayjs(date).format('YYYY/MM/DD')}
          parseDate={str => dayjs(str).toDate()}
          onChange={selectedDate => setOrderTime(selectedDate)}
          value={orderTime}
        />
      </FormGroup>
      {error && (
        <Callout intent="danger" title="建立訂單失敗">
          error
        </Callout>
      )}
    </>
  );
};

export default OrderCreator;
