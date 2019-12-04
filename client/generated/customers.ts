/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: customers
// ====================================================

export interface customers_customers {
  __typename: "Customer";
  id: string;
  displayId: number;
  name: string;
  address: string | null;
  phone: string | null;
}

export interface customers {
  customers: customers_customers[];
}
