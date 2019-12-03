import { gql } from 'apollo-boost';
export const GET_PRODUCTS = gql`
  query products {
    products {
      id
      name
      price
      displayId
      unit
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: String!, $data: ProductUpdateInput!) {
    updateProduct(id: $id, data: $data) {
      id
    }
  }
`;
