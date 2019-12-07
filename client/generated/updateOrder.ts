/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderUpdateInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateOrder
// ====================================================

export interface updateOrder_updateOrder_customer {
  __typename: "Customer";
  id: string;
  name: string;
  address: string | null;
  displayId: number;
}

export interface updateOrder_updateOrder_orderItem_product {
  __typename: "Product";
  id: string;
  name: string;
  unit: string | null;
}

export interface updateOrder_updateOrder_orderItem {
  __typename: "OrderItem";
  id: string;
  price: number;
  quantity: number;
  product: updateOrder_updateOrder_orderItem_product | null;
}

export interface updateOrder_updateOrder {
  __typename: "Order";
  id: string;
  displayId: number;
  customer: updateOrder_updateOrder_customer;
  updatedAt: any;
  createdAt: any;
  orderTime: any;
  status: OrderStatus;
  remark: string | null;
  orderItem: updateOrder_updateOrder_orderItem[];
  orderNumber: string | null;
}

export interface updateOrder {
  /**
   * update order
   */
  updateOrder: updateOrder_updateOrder;
}

export interface updateOrderVariables {
  id: string;
  data: OrderUpdateInput;
}
