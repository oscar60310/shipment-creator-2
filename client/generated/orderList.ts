/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: orderList
// ====================================================

export interface orderList_orders_customer {
  __typename: "Customer";
  name: string;
}

export interface orderList_orders {
  __typename: "Order";
  id: string;
  displayId: number;
  customer: orderList_orders_customer;
  orderTime: any;
  orderNumber: string | null;
}

export interface orderList {
  orders: orderList_orders[];
}

export interface orderListVariables {
  where: OrderSearchInput;
}
