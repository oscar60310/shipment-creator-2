import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { products, products_products } from '../generated/products';
import { customer, customerVariables } from '../generated/customer';
import { GET_CUSTOMER } from '../queries/customer';
import { GET_PRODUCTS } from '../queries/product';
import { isUndefined, sortBy } from 'lodash';

export const useSortedProductList = (customerId: string) => {
  const [
    queryProduct,
    { data: productList, loading: productListLoading, error: productListError }
  ] = useLazyQuery<products>(GET_PRODUCTS);
  const {
    data: customerData,
    loading: customerLoading,
    error: customerError
  } = useQuery<customer, customerVariables>(GET_CUSTOMER, {
    variables: {
      id: customerId
    },
    onCompleted: () => {
      queryProduct();
    }
  });

  const findSortSeq = (product: products_products) => {
    const storedSql = customerData.customer.productSorts.find(
      sortData => sortData.productId === product.id
    )?.sort;

    // if not defined for customer, use display id to sort
    return isUndefined(storedSql)
      ? customerData.customer.productSorts.length + product.displayId
      : storedSql;
  };

  const data = productList?.products
    ? sortBy(productList.products, findSortSeq)
    : undefined;

  return {
    loading: customerLoading || productListLoading,
    error: productListError || customerError,
    data
  };
};
