import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import _ from 'lodash';

import { projectNodeFragment } from 'utils/graphql';

import ProjectList from './List';

const query = gql`
  query Projects {
    projects(first:10) {
      edges {
        node {
          ...ProjectNode
        }
      }
    }
  }
  ${projectNodeFragment}
`;

export default () => (
  <Query query={query}>
    {
      ({
        loading, error, data,
      }) => {
        if (loading) {
          return <p>loading...</p>;
        }
        if (error) {
          return <p>{error.message}</p>;
        }

        const edges = _.get(data, ['projects', 'edges'], []);
        const projects = _.map(edges, ({ node }) => node);

        return (
          <ProjectList projects={projects} />
        );
      }
    }
  </Query>
);
