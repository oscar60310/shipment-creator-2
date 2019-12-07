import { gql } from 'apollo-boost';

const ORDER_PREVIEW = gql`
  fragment OrderPreview on Order {
    id
    displayId
    customer {
      name
    }
    orderTime
    orderNumber
    displayId
    status
  }
`;

const ORDER_DETAIL = gql`
  fragment OrderDetail on Order {
    id
    displayId
    customer {
      id
      name
      address
      displayId
    }
    updatedAt
    createdAt
    orderTime
    status
    remark
    orderItem {
      id
      price
      quantity
      product {
        id
        name
        unit
      }
    }
    orderNumber
  }
`;

export const GET_ORDER_LIST = gql`
  query orderList($where: OrderSearchInput!) {
    orders(where: $where) {
      ...OrderPreview
    }
  }

  ${ORDER_PREVIEW}
`;

export const GET_ORDER_DETAIL = gql`
  query orderDetail($id: String!) {
    order(id: $id) {
      ...OrderDetail
    }
  }
  ${ORDER_DETAIL}
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder($id: String!, $data: OrderUpdateInput!) {
    updateOrder(id: $id, data: $data) {
      ...OrderDetail
    }
  }
  ${ORDER_DETAIL}
`;

export const CREATE_ORDER = gql`
  mutation createOrder($data: OrderCreateInput!) {
    createOrder(data: $data) {
      ...OrderPreview
    }
  }
  ${ORDER_PREVIEW}
`;
