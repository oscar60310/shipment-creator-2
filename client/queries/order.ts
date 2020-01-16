import { gql } from 'apollo-boost';

const ORDER_PREVIEW = gql`
  fragment orderPreviewFragment on Order {
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
  fragment orderDetailFragment on Order {
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
      ...orderPreviewFragment
    }
  }

  ${ORDER_PREVIEW}
`;

export const GET_ORDER_DETAIL = gql`
  query orderDetail($id: String!) {
    order(id: $id) {
      ...orderDetailFragment
    }
  }
  ${ORDER_DETAIL}
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder($id: String!, $data: OrderUpdateInput!) {
    updateOrder(id: $id, data: $data) {
      ...orderDetailFragment
    }
  }
  ${ORDER_DETAIL}
`;

export const CREATE_ORDER = gql`
  mutation createOrder($data: OrderCreateInput!) {
    createOrder(data: $data) {
      ...orderPreviewFragment
    }
  }
  ${ORDER_PREVIEW}
`;

export const DELETE_ORDER = gql`
  mutation deleteOrder($id: String!) {
    deleteOrder(id: $id) {
      ...orderDetailFragment
    }
  }
  ${ORDER_DETAIL}
`;
