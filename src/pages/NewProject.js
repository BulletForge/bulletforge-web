import React from 'react';
import NewProject from 'components/NewProject';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
  },
}));

const NewProjectPage = () => {
  const classes = useStyles();

  return (
    <Container component="main">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        New Project
        </Typography>
        <NewProject />
      </div>
    </Container>
  );
};

export default NewProjectPage;
