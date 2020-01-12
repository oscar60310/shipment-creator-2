/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: orderPreviewFragment
// ====================================================

export interface orderPreviewFragment_customer {
  __typename: "Customer";
  name: string;
}

export interface orderPreviewFragment {
  __typename: "Order";
  id: string;
  displayId: number;
  customer: orderPreviewFragment_customer;
  orderTime: any;
  orderNumber: string | null;
  status: OrderStatus;
}
