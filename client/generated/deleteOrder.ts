/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteOrder
// ====================================================

export interface deleteOrder_deleteOrder_customer {
  __typename: "Customer";
  id: string;
  name: string;
  address: string | null;
  displayId: number;
}

export interface deleteOrder_deleteOrder_orderItem_product {
  __typename: "Product";
  id: string;
  name: string;
  unit: string | null;
}

export interface deleteOrder_deleteOrder_orderItem {
  __typename: "OrderItem";
  id: string;
  price: number;
  quantity: number;
  product: deleteOrder_deleteOrder_orderItem_product | null;
}

export interface deleteOrder_deleteOrder {
  __typename: "Order";
  id: string;
  displayId: number;
  customer: deleteOrder_deleteOrder_customer;
  updatedAt: any;
  createdAt: any;
  orderTime: any;
  status: OrderStatus;
  remark: string | null;
  orderItem: deleteOrder_deleteOrder_orderItem[];
  orderNumber: string | null;
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
