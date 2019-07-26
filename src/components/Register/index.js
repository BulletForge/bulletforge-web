import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { useSnackbar } from 'notistack';
import { Formik } from 'formik';
import _ from 'lodash';

import Link from 'components/Link';
import showSnackbar from 'utils/snackbar';

import Schema from './Schema';
import Form from './Form';

const registerMutation = gql`
  mutation Register(
    $login: String!,
    $email: String!,
    $password: String!,
    $passwordConfirmation: String!
  ) {
    register(input: {
      login: $login
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
    }) {
      errors {
        path
        message
      }
    }
  }
`;

const Register = ({ onSuccess }) => {
  const snackbarHook = useSnackbar();

  return (
    <Mutation mutation={registerMutation}>
      {
      register => (
        <>
          <Formik
            initialValues={{
              login: '',
              email: '',
              password: '',
              passwordConfirmation: '',
            }}
            validationSchema={Schema}
            onSubmit={async (variables, { setSubmitting, setFieldError }) => {
              let response;

              try {
                response = await register({ variables });
              } catch (error) {
                showSnackbar(snackbarHook, error.message, 'error');
                return;
              } finally {
                setSubmitting(false);
              }

              const { data: { register: { errors } } } = response;

              if (_.isEmpty(errors)) {
                onSuccess();
              } else {
                _.each(errors, ({ path, message }) => {
                  setFieldError(path[1], message);
                });
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form isSubmitting={isSubmitting} />
            )}
          </Formik>
          <Link to="/login" variant="body2">
              Already have an account?
          </Link>
        </>
      )
    }
    </Mutation>
  );
};

Register.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default Register;
