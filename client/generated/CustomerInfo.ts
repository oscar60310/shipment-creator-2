/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CustomerInfo
// ====================================================

export interface CustomerInfo_productSorts {
  __typename: "ProductSort";
  sort: number;
  productId: string;
}

export interface CustomerInfo {
  __typename: "Customer";
  id: string;
  displayId: number;
  name: string;
  address: string | null;
  phone: string | null;
  productSorts: CustomerInfo_productSorts[];
}
