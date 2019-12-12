import { gql } from 'apollo-boost';
export const GET_DETAIL_REPORT = gql`
  query detailReport($where: ReportWhere!) {
    monthlyDetailReport(where: $where) {
      orderId
      orderTime
      orderNumber
      productId
      productName
      price
      unit
      quantity
    }
  }
`;

export const GET_PRODUCT_PRICE_REPORT = gql`
  query productPriceReport($where: ReportWhere!) {
    byProductPriceReport(where: $where) {
      productId
      productName
      price
      unit
      quantity
    }
  }
`;

export const GET_PRODUCT_REPORT = gql`
  query productReport($where: ReportWhere!) {
    byProductReport(where: $where) {
      productId
      productName
      subTotal
      unit
      quantity
    }
  }
`;
