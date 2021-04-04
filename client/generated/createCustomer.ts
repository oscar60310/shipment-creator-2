/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CustomerCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createCustomer
// ====================================================

export interface createCustomer_createCustomer_productSorts {
  __typename: "ProductSort";
  sort: number;
  productId: string;
}

export interface createCustomer_createCustomer {
  __typename: "Customer";
  id: string;
  displayId: number;
  name: string;
  address: string | null;
  phone: string | null;
  productSorts: createCustomer_createCustomer_productSorts[];
}

export interface createCustomer {
  /**
   * create new customer
   */
  createCustomer: createCustomer_createCustomer;
}

export interface createCustomerVariables {
  data: CustomerCreateInput;
}
