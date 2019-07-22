import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Link from 'components/Link';
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

const Login = ({ onLogin }) => (
  <Mutation mutation={loginMutation}>
    {
      login => (
        <>
          <Form login={login} onLogin={onLogin} />
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

Login.propTypes = {
  onLogin: PropTypes.func,
};

Login.defaultProps = {
  onLogin: () => {},
};

export default Login;
