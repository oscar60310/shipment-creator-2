/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ReportWhere } from "./globalTypes";

// ====================================================
// GraphQL query operation: detailReport
// ====================================================

export interface detailReport_monthlyDetailReport {
  __typename: "MonthlyDetailReport";
  orderId: string;
  orderTime: any;
  orderNumber: string | null;
  productId: string;
  productName: string;
  price: number;
  unit: string;
  quantity: number;
}

export interface detailReport {
  monthlyDetailReport: detailReport_monthlyDetailReport[];
}

export interface detailReportVariables {
  where: ReportWhere;
}
