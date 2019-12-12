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
