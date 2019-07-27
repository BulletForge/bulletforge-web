import { gql } from 'apollo-boost';
import { propType } from 'graphql-anywhere';

export const userNodeFragment = gql`
  fragment UserNode on User {
    id
    login
    email
    admin
    permalink
  }
`;

export const userPropType = propType(userNodeFragment);
