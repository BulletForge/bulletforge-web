import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Link from 'components/Link';
import { setAccessToken } from 'utils/accessToken';
import Form from './Form';

const loginMutation = gql`
  mutation Login(
    $login: String!,
    $password: String!,
  ) {
    login(input: {
      login: $login
      password: $password
    }) {
      token
      errors {
        path
        message
      }
    }
  }
`;

const Login = ({ onLogin, updateAccessToken }) => {
  const handleLogin = (token) => {
    setAccessToken(token);
    updateAccessToken(token);
    onLogin(token);
  };

  return (
    <Mutation mutation={loginMutation}>
      {
      (login, { error }) => (
        <>
          { error && <p>{error.message}</p> }
          <Form login={login} onLogin={handleLogin} />
          <Grid container>
            <Grid item xs>
              <Link to="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </>
      )
    }
    </Mutation>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func,
  updateAccessToken: PropTypes.func.isRequired,
};

Login.defaultProps = {
  onLogin: () => {},
};

export default Login;
