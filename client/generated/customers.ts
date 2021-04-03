/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: customers
// ====================================================

export interface customers_customers_productSorts {
  __typename: "ProductSort";
  sort: number;
  productId: string;
}

export interface customers_customers {
  __typename: "Customer";
  id: string;
  displayId: number;
  name: string;
  address: string | null;
  phone: string | null;
  productSorts: customers_customers_productSorts[];
}

export interface customers {
  customers: customers_customers[];
}
