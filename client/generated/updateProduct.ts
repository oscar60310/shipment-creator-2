/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductUpdateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateProduct
// ====================================================

export interface updateProduct_updateProduct {
  __typename: "Product";
  id: string;
}

export interface updateProduct {
  /**
   * update product
   */
  updateProduct: updateProduct_updateProduct;
}

export interface updateProductVariables {
  id: string;
  data: ProductUpdateInput;
}
