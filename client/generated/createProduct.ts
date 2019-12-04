/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createProduct
// ====================================================

export interface createProduct_createProduct {
  __typename: "Product";
  id: string;
  name: string;
  price: number | null;
  displayId: number;
  unit: string | null;
}

export interface createProduct {
  /**
   * create new product
   */
  createProduct: createProduct_createProduct;
}

export interface createProductVariables {
  data: ProductCreateInput;
}
