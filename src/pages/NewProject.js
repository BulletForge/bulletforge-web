import React from 'react';
import NewProject from 'components/NewProject';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const NewProjectPage = () => {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.container}>
      <Paper className={classes.paper}>
        <NewProject />
      </Paper>
    </Container>
  );
};

export default NewProjectPage;
