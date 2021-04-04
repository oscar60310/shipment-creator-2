/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: customer
// ====================================================

export interface customer_customer_productSorts {
  __typename: "ProductSort";
  sort: number;
  productId: string;
}

export interface customer_customer {
  __typename: "Customer";
  id: string;
  displayId: number;
  name: string;
  address: string | null;
  phone: string | null;
  productSorts: customer_customer_productSorts[];
}

export interface customer {
  customer: customer_customer;
}

export interface customerVariables {
  id: string;
}
