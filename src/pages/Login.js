import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { CurrentUserConsumer } from 'components/CurrentUser';
import Login from 'components/Login';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const LoginPage = ({ history }) => {
  const classes = useStyles();

  return (
    <CurrentUserConsumer>
      {
      ({ login }) => {
        const handleLogin = (token) => {
          login(token);
          history.replace('/');
        };

        return (
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <Login onLogin={handleLogin} />
            </div>
          </Container>
        );
      }
    }
    </CurrentUserConsumer>
  );
};

LoginPage.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default LoginPage;
