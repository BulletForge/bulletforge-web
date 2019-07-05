import React from 'react';
import { Query } from 'react-apollo';
import _ from 'lodash';

import ProjectList from './List';
import { projectsQuery } from './data';

export default () => (
  <Query query={projectsQuery}>
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
