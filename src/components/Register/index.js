import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import _ from 'lodash';

import FormikMutation from 'components/FormikMutation';
import Link from 'components/Link';

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

const Register = ({ onSuccess }) => (
  <>
    <FormikMutation
      mutation={registerMutation}
      onMutationSuccess={(response, { setFieldError }) => {
        const { data: { register: { errors } } } = response;

        if (_.isEmpty(errors)) {
          onSuccess();
        } else {
          _.each(errors, ({ path, message }) => {
            setFieldError(path[1], message);
          });
        }
      }}
      initialValues={{
        login: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={Schema}
    >
      {({ isSubmitting }) => (
        <Form isSubmitting={isSubmitting} />
      )}
    </FormikMutation>
    <Link to="/login" variant="body2">
        Already have an account?
    </Link>
  </>
);

Register.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default Register;
