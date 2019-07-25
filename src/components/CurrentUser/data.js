import { gql } from 'apollo-boost';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

export const userNodeFragement = gql`
  fragment UserNode on User {
    id
    login
    email
    admin
  }
`;

export const userPropType = propType(userNodeFragement);
export const usersPropType = PropTypes.arrayOf(userPropType);

export const meQuery = gql`
  query Me {
    me {
      ...UserNode
    }
  }
  ${userNodeFragement}
`;
