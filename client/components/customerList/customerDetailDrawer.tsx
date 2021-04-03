import React, { FunctionComponent } from 'react';
import { Classes, Drawer } from '@blueprintjs/core';
import { customers_customers } from '../../generated/customers';
import ItemSortTable from '../../shared/itemSortTable';

interface Props {
  open: boolean;
  customer: customers_customers;
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
      title={`${customer.name} - 客戶進階設定`}
    >
      <div className={Classes.DRAWER_BODY}>
        <div className={Classes.DIALOG_BODY}>
          <h4>優先產品選單設定</h4>
          <ItemSortTable />
        </div>
        <div className={Classes.DRAWER_FOOTER}>Footer</div>
      </div>
    </Drawer>
  );
};

export default CustomerDetailDrawer;
