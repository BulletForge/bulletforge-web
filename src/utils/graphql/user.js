import { gql } from 'apollo-boost';
import { propType } from 'graphql-anywhere';

export const userNodeFragment = gql`
  fragment UserNode on User {
    id
    login
    email
    admin
  }
`;

export const userPropType = propType(userNodeFragment);
