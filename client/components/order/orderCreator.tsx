import React from 'react';
import {
  Spinner,
  MenuItem,
  Button,
  FormGroup,
  Callout
} from '@blueprintjs/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { customers, customers_customers } from '../../generated/customers';
import { GET_CUSTOMERS } from '../../queries/customer';
import { Select } from '@blueprintjs/select';
import { DateInput } from '@blueprintjs/datetime';
import dayjs from 'dayjs';
import { createOrderVariables } from '../../generated/createOrder';

const CustomerSelect = Select.ofType<customers_customers>();

export const renderMonthMenuItem = (
  item: customers_customers,
  { handleClick, modifiers }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={item.id}
      onClick={handleClick}
      text={`[${item.displayId}] ${item.name}`}
    />
  );
};

const OrderCreator = (props: {
  onSuccess?: (data: createOrderVariables) => void;
  error?: any;
}) => {
  const { onSuccess, error } = props;
  const [customerSelected, setCustomerSelected] = React.useState<
    customers_customers
  >(null);
  const [orderTime, setOrderTime] = React.useState(new Date());
  const { data: customerData, loading: customerLoading } = useQuery<customers>(
    GET_CUSTOMERS
  );
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
  if (customerLoading) {
    return (
      <>
        <Spinner />
        <div>正在載入客戶資料</div>
      </>
    );
  }

  return (
    <>
      <FormGroup label="客戶">
        <CustomerSelect
          items={customerData.customers}
          itemRenderer={renderMonthMenuItem}
          onItemSelect={item => {
            setCustomerSelected(item);
          }}
          filterable={false}
        >
          <Button
            text={customerSelected ? customerSelected.name : '請選擇客戶'}
            rightIcon="double-caret-vertical"
            style={{ width: '100%' }}
          />
        </CustomerSelect>
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
