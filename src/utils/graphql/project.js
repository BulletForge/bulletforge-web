import { gql } from 'apollo-boost';
import { propType } from 'graphql-anywhere';

export const projectNodeFragment = gql`
  fragment ProjectNode on Project {
    id
    title
    description
    createdAt
    downloads
    permalink
    imageUrl
    user {
      login
      permalink
    }
  }
`;

export const projectPropType = propType(projectNodeFragment);
