/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CustomerProductSortUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateCustomerProductSort
// ====================================================

export interface updateCustomerProductSort_updateCustomerProductSort_productSorts {
  __typename: "ProductSort";
  sort: number;
  productId: string;
}

export interface updateCustomerProductSort_updateCustomerProductSort {
  __typename: "Customer";
  id: string;
  displayId: number;
  name: string;
  address: string | null;
  phone: string | null;
  productSorts: updateCustomerProductSort_updateCustomerProductSort_productSorts[];
}

export interface updateCustomerProductSort {
  /**
   * update customer product sort property
   */
  updateCustomerProductSort: updateCustomerProductSort_updateCustomerProductSort;
}

export interface updateCustomerProductSortVariables {
  id: string;
  data: CustomerProductSortUpdateInput;
}
