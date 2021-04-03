import { gql } from 'apollo-boost';

const customerFragment = gql`
  fragment CustomerInfo on Customer {
    id
    displayId
    name
    address
    phone
    productSorts {
      sort
      productId
    }
  }
`;

export const GET_CUSTOMERS = gql`
  query customers {
    customers {
      ...CustomerInfo
    }
  }

  ${customerFragment}
`;

export const GET_CUSTOMER = gql`
  query customer($id: String!) {
    customer(id: $id) {
      ...CustomerInfo
    }
  }

  ${customerFragment}
`;

export const CREATE_CUSTOMER = gql`
  mutation createCustomer($data: CustomerCreateInput!) {
    createCustomer(data: $data) {
      ...CustomerInfo
    }
  }

  ${customerFragment}
`;

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($id: String!, $data: CustomerUpdateInput!) {
    updateCustomer(id: $id, data: $data) {
      id
    }
  }
`;

export const UPDATE_CUSTOMER_PRODUCT_SORT = gql`
  mutation updateCustomerProductSort(
    $id: String!
    $data: CustomerProductSortUpdateInput!
  ) {
    updateCustomerProductSort(id: $id, data: $data) {
      ...CustomerInfo
    }
  }

  ${customerFragment}
`;
