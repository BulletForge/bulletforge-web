import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';

import { projectPropType } from 'utils/graphql';

import ProjectListItem from './ListItem';

const ProjectList = ({ projects }) => (
  <Container>
    <List>
      { _.map(projects, project => <ProjectListItem project={project} key={project.id} />) }
    </List>
  </Container>
);

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(projectPropType).isRequired,
};

export default ProjectList;
