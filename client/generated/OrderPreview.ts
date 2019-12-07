/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: OrderPreview
// ====================================================

export interface OrderPreview_customer {
  __typename: "Customer";
  name: string;
}

export interface OrderPreview {
  __typename: "Order";
  id: string;
  displayId: number;
  customer: OrderPreview_customer;
  orderTime: any;
  orderNumber: string | null;
  status: OrderStatus;
}
