import React from 'react';
import NewProject from 'components/NewProject';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(8),
  },
}));

const NewProjectPage = () => {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.container}>
      <Typography component="h1" variant="h3">
        New Project
      </Typography>
      <NewProject />
    </Container>
  );
};

export default NewProjectPage;
