/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ReportWhere } from "./globalTypes";

// ====================================================
// GraphQL query operation: productPriceReport
// ====================================================

export interface productPriceReport_byProductPriceReport {
  __typename: "ByProductPriceReport";
  productId: string;
  productName: string;
  price: number;
  unit: string;
  quantity: number;
}

export interface productPriceReport {
  byProductPriceReport: productPriceReport_byProductPriceReport[];
}

export interface productPriceReportVariables {
  where: ReportWhere;
}
