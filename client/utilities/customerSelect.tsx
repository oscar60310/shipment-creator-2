import React from 'react';
import { Select } from '@blueprintjs/select';
import { customers_customers, customers } from '../generated/customers';
import { MenuItem, Button } from '@blueprintjs/core';
import { useQuery } from '@apollo/react-hooks';
import { GET_CUSTOMERS } from '../queries/customer';

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

const CustomerSelector = (props: {
  onSelect?: (value: customers_customers) => void;
}) => {
  const { onSelect } = props;
  const [customerSelected, setCustomerSelected] = React.useState<
    customers_customers
  >(null);
  const { data: customerData, loading } = useQuery<customers>(GET_CUSTOMERS);

  React.useEffect(() => {
    if (onSelect && customerSelected) {
      onSelect(customerSelected);
    }
  }, [customerSelected]);
  return (
    <CustomerSelect
      items={loading ? [] : customerData.customers}
      itemRenderer={renderMonthMenuItem}
      onItemSelect={item => {
        setCustomerSelected(item);
      }}
      filterable={false}
      disabled={loading}
    >
      <Button
        text={customerSelected ? customerSelected.name : '請選擇客戶'}
        rightIcon="double-caret-vertical"
        style={{ width: '100%' }}
      />
    </CustomerSelect>
  );
};

export default CustomerSelector;
