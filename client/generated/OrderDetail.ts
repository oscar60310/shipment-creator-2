/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: OrderDetail
// ====================================================

export interface OrderDetail_customer {
  __typename: "Customer";
  id: string;
  name: string;
  address: string | null;
  displayId: number;
}

export interface OrderDetail_orderItem_product {
  __typename: "Product";
  id: string;
  name: string;
  unit: string | null;
}

export interface OrderDetail_orderItem {
  __typename: "OrderItem";
  id: string;
  price: number;
  quantity: number;
  product: OrderDetail_orderItem_product | null;
}

export interface OrderDetail {
  __typename: "Order";
  id: string;
  displayId: number;
  customer: OrderDetail_customer;
  updatedAt: any;
  createdAt: any;
  orderTime: any;
  status: OrderStatus;
  remark: string | null;
  orderItem: OrderDetail_orderItem[];
  orderNumber: string | null;
}
