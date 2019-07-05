import { gql } from 'apollo-boost';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

export const projectNodeFragement = gql`
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

export const projectPropType = propType(projectNodeFragement);
export const projectsPropType = PropTypes.arrayOf(projectPropType);

export const projectsQuery = gql`
  query Projects {
    projects(first:10) {
      edges {
        node {
          ...ProjectNode
        }
      }
    }
  }
  ${projectNodeFragement}
`;
