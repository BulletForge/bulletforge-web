import React from 'react';
import _ from 'lodash';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';

import ProjectListItem from './ListItem';
import { projectsPropType } from './data';

const ProjectList = ({ projects }) => (
  <Container>
    <List>
      { _.map(projects, project => <ProjectListItem project={project} key={project.id} />) }
    </List>
  </Container>
);

ProjectList.propTypes = {
  projects: projectsPropType.isRequired,
};

export default ProjectList;
