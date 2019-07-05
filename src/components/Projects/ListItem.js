import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { projectPropType } from './data';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'flex-start',
    height: 200,
  },
  image: {
    height: '100%',
    marginRight: theme.spacing(2),
  },
  content: {
    flex: 1,
  },
  title: {

  },
  subtitle: {

  },
  description: {
    marginTop: theme.spacing(2),
    height: 70,
    overflow: 'hidden',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    display: '-webkit-box',
  },
}));

const ProjectListItem = ({
  project: {
    title,
    description,
    imageUrl,
    user: { login },
  },
}) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.root}>
      <img
        className={classes.image}
        src={imageUrl}
        alt={title}
      />

      <div className={classes.content}>
        <Typography className={classes.title} variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
          {`by ${login}`}
        </Typography>
        <Typography className={classes.description} color="textSecondary">
          {description}
        </Typography>
      </div>
    </ListItem>
  );
};

ProjectListItem.propTypes = {
  project: projectPropType.isRequired,
};

export default ProjectListItem;
