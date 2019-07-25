import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  register: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const GuestUser = () => {
  const classes = useStyles();

  return (
    <>
      <Button
        color="inherit"
        component={RouterLink}
        to="/register"
        className={classes.register}
      >
        Register
      </Button>
      <Button
        color="inherit"
        component={RouterLink}
        to="/login"
      >
        Login
      </Button>
    </>
  );
};

export default GuestUser;
