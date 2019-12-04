import { gql } from 'apollo-boost';
export const GET_ORDER_LIST = gql`
  query orderList($where: OrderSearchInput!) {
    orders(where: $where) {
      id
      displayId
      customer {
        name
      }
      orderTime
      orderNumber
    }
  }
`;
