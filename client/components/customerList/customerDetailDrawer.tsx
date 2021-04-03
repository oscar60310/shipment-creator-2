import React, { FunctionComponent } from 'react';
import { Button, Callout, Classes, Drawer } from '@blueprintjs/core';
import { customers_customers } from '../../generated/customers';
import ItemSortTable from '../../shared/itemSortTable';
import { products, products_products } from '../../generated/products';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UPDATE_CUSTOMER_PRODUCT_SORT } from '../../queries/customer';
import {
  updateCustomerProductSort,
  updateCustomerProductSortVariables
} from '../../generated/updateCustomerProductSort';
import { GET_PRODUCTS } from '../../queries/product';

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
  const [productSort, setProductSort] = React.useState<products_products[]>([]);
  const { data: productList } = useQuery<products>(GET_PRODUCTS);
  const [error, setError] = React.useState<ApolloError | null>();

  React.useEffect(() => {
    if (!customer.productSorts || !productList) return;

    setProductSort(
      customer.productSorts.map(productSortRecord =>
        productList.products.find(
          product => product.id === productSortRecord.productId
        )
      )
    );
  }, [customer.productSorts, productList]);

  const [
    updateProductSort,
    { loading: updateCustomerProductSortLoading }
  ] = useMutation<
    updateCustomerProductSort,
    updateCustomerProductSortVariables
  >(UPDATE_CUSTOMER_PRODUCT_SORT, {
    onCompleted: () => {
      onClose();
    },
    onError: e => {
      setError(e);
    }
  });

  const save = async () => {
    setError(null);
    await updateProductSort({
      variables: {
        id: customer.id,
        data: {
          productSorts: productSort.map(product => product.id)
        }
      }
    });
  };

  return (
    <Drawer
      isOpen={open}
      onClose={() => {
        if (onClose) onClose();
      }}
      title={`${customer.name} - 客戶進階設定`}
    >
      <div className={Classes.DRAWER_BODY}>
        {error && (
          <Callout intent="danger" title="儲存失敗">
            {error.message}
          </Callout>
        )}
        <div className={Classes.DIALOG_BODY}>
          <h4>優先產品選單設定</h4>
          <ItemSortTable productSort={productSort} onUpdate={setProductSort} />
        </div>
      </div>
      <div className={Classes.DRAWER_FOOTER}>
        <Button
          intent="primary"
          minimal
          onClick={() => save()}
          loading={updateCustomerProductSortLoading}
        >
          儲存
        </Button>
      </div>
    </Drawer>
  );
};

export default CustomerDetailDrawer;
