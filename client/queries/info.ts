import { gql } from 'apollo-boost';

export const GET_SYSTEM_INFO = gql`
  query systemInfo {
    systemInfo {
      companyName
      companyAddress
      companyPhone
    }
  }
`;
