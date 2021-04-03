import React, { FunctionComponent } from 'react';
import { Drawer } from '@blueprintjs/core';
import { customers_customers } from '../../generated/customers';

interface Props {
  open: boolean;
  customer?: customers_customers;
  onClose?: () => void;
}

const CustomerDetailDrawer: FunctionComponent<Props> = ({
  open,
  onClose,
  customer
}) => {
  return (
    <Drawer
      isOpen={open}
      onClose={() => {
        if (onClose) onClose();
      }}
    >
      {customer && customer.name}
    </Drawer>
  );
};

export default CustomerDetailDrawer;
