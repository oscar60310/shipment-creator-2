/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: orderDetail
// ====================================================

export interface orderDetail_order_customer {
  __typename: "Customer";
  id: string;
  name: string;
  address: string | null;
  displayId: number;
}

export interface orderDetail_order_orderItem_product {
  __typename: "Product";
  id: string;
  name: string;
  unit: string | null;
}

export interface orderDetail_order_orderItem {
  __typename: "OrderItem";
  id: string;
  price: number;
  quantity: number;
  product: orderDetail_order_orderItem_product | null;
}

export interface orderDetail_order {
  __typename: "Order";
  id: string;
  displayId: number;
  customer: orderDetail_order_customer;
  updatedAt: any;
  createdAt: any;
  orderTime: any;
  status: OrderStatus;
  remark: string | null;
  orderItem: orderDetail_order_orderItem[];
  orderNumber: string | null;
}

export interface orderDetail {
  order: orderDetail_order;
}

export interface orderDetailVariables {
  id: string;
}
