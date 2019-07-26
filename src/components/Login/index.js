import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { useSnackbar } from 'notistack';
import { Formik } from 'formik';
import _ from 'lodash';

import Link from 'components/Link';
import showSnackbar from 'utils/snackbar';

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

const Login = ({ onLogin }) => {
  const snackbarHook = useSnackbar();

  return (
    <Mutation mutation={loginMutation}>
      {
        login => (
          <>
            <Formik
              initialValues={{
                login: '',
                password: '',
                rememberMe: false,
              }}
              validationSchema={LoginSchema}
              onSubmit={async (variables, { setSubmitting, setFieldError }) => {
                let response;

                try {
                  response = await login({ variables });
                } catch (error) {
                  showSnackbar(snackbarHook, error.message, 'error');
                  return;
                } finally {
                  setSubmitting(false);
                }

                const { data: { login: { token, errors } } } = response;

                if (token) {
                  onLogin(token);
                } else {
                  setFieldError('general', _.map(errors, 'message'));
                }
              }}
            >
              {({
                isSubmitting,
                errors,
              }) => (
                <Form isSubmitting={isSubmitting} errors={errors} />
              )}
            </Formik>
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
        )
      }
    </Mutation>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func,
};

Login.defaultProps = {
  onLogin: () => {},
};

export default Login;
