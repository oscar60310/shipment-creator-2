/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteOrder
// ====================================================

export interface deleteOrder_deleteOrder_customer {
  __typename: "Customer";
  name: string;
}

export interface deleteOrder_deleteOrder {
  __typename: "Order";
  id: string;
  displayId: number;
  customer: deleteOrder_deleteOrder_customer;
  orderTime: any;
  orderNumber: string | null;
  status: OrderStatus;
}

export interface deleteOrder {
  /**
   * delete order
   */
  deleteOrder: deleteOrder_deleteOrder;
}

export interface deleteOrderVariables {
  id: string;
}
