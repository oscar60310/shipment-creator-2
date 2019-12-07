/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createOrder
// ====================================================

export interface createOrder_createOrder {
  __typename: "Order";
  id: string;
}

export interface createOrder {
  /**
   * create new order
   */
  createOrder: createOrder_createOrder;
}

export interface createOrderVariables {
  data: OrderCreateInput;
}
