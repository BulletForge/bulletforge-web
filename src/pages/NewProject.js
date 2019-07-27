import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import NewProject from 'components/NewProject';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const NewProjectPage = ({ history }) => {
  const classes = useStyles();
  const handleSuccess = (project) => {
    history.replace(`/${project.user.permalink}/${project.permalink}`);
  };

  return (
    <Container component="main" className={classes.container}>
      <Paper className={classes.paper}>
        <NewProject onSuccess={handleSuccess} />
      </Paper>
    </Container>
  );
};

NewProjectPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default NewProjectPage;
