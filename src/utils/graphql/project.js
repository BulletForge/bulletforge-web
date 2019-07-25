import { gql } from 'apollo-boost';
import { propType } from 'graphql-anywhere';

import { userNodeFragment } from './user';

export const projectNodeFragment = gql`
  fragment ProjectNode on Project {
    id
    title
    description
    createdAt
    downloads
    permalink
    user {
      ...UserNode
    }
  }
  ${userNodeFragment}
`;

export const projectPropType = propType(projectNodeFragment);
