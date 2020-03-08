import React from 'react';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';

import FormikMutation from 'components/FormikMutation';
import Link from 'components/Link';

import LoginSchema from './Schema';
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
  <>
    <FormikMutation
      mutation={loginMutation}
      onMutationSuccess={(response, { setFieldError }) => {
        const { data: { login: { token, errors } } } = response;

        if (token) {
          onLogin(token);
        } else {
          setFieldError('general', _.map(errors, 'message'));
        }
      }}
      initialValues={{
        login: '',
        password: '',
        rememberMe: false,
      }}
      validationSchema={LoginSchema}
    >
      {({
        isSubmitting,
        errors,
      }) => (
        <Form isSubmitting={isSubmitting} errors={errors} />
      )}
    </FormikMutation>
    <Grid container>
      <Grid item xs>
        <Link to="/" variant="body2">
          Forgot password?
        </Link>
      </Grid>
      <Grid item>
        <Link to="/register" variant="body2">
          Don&apos;t have an account? Sign Up
        </Link>
      </Grid>
    </Grid>
  </>
);

Login.propTypes = {
  onLogin: PropTypes.func,
};

Login.defaultProps = {
  onLogin: () => {},
};

export default Login;
