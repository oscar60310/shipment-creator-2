/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderCreateInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createOrder
// ====================================================

export interface createOrder_createOrder_customer {
  __typename: "Customer";
  name: string;
}

export interface createOrder_createOrder {
  __typename: "Order";
  id: string;
  displayId: number;
  customer: createOrder_createOrder_customer;
  orderTime: any;
  orderNumber: string | null;
  status: OrderStatus;
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
