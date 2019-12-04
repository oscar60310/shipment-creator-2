import { gql } from 'apollo-boost';
export const GET_CUSTOMERS = gql`
  query customers {
    customers {
      id
      displayId
      name
      address
      phone
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation createCustomer($data: CustomerCreateInput!) {
    createCustomer(data: $data) {
      id
      displayId
      name
      address
      phone
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($id: String!, $data: CustomerUpdateInput!) {
    updateCustomer(id: $id, data: $data) {
      id
    }
  }
`;
