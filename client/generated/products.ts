/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: products
// ====================================================

export interface products_products {
  __typename: "Product";
  id: string;
  name: string;
  price: number | null;
  displayId: number;
  unit: string | null;
}

export interface products {
  products: products_products[];
}
