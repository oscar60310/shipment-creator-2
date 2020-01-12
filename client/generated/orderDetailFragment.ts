/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: orderDetailFragment
// ====================================================

export interface orderDetailFragment_customer {
  __typename: "Customer";
  id: string;
  name: string;
  address: string | null;
  displayId: number;
}

export interface orderDetailFragment_orderItem_product {
  __typename: "Product";
  id: string;
  name: string;
  unit: string | null;
}

export interface orderDetailFragment_orderItem {
  __typename: "OrderItem";
  id: string;
  price: number;
  quantity: number;
  product: orderDetailFragment_orderItem_product | null;
}

export interface orderDetailFragment {
  __typename: "Order";
  id: string;
  displayId: number;
  customer: orderDetailFragment_customer;
  updatedAt: any;
  createdAt: any;
  orderTime: any;
  status: OrderStatus;
  remark: string | null;
  orderItem: orderDetailFragment_orderItem[];
  orderNumber: string | null;
}
