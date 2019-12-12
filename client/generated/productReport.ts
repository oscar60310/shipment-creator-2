/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ReportWhere } from "./globalTypes";

// ====================================================
// GraphQL query operation: productReport
// ====================================================

export interface productReport_byProductReport {
  __typename: "ByProductReport";
  productId: string;
  productName: string;
  subTotal: number;
  unit: string;
  quantity: number;
}

export interface productReport {
  byProductReport: productReport_byProductReport[];
}

export interface productReportVariables {
  where: ReportWhere;
}
