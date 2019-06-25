import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import _ from 'lodash';
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
  <Mutation
    mutation={registerMutation}
  >
    {
      register => (
        <Form onSubmit={async (variables, { setSubmitting, setFieldError }) => {
          const { data: { register: { errors } } } = await register({ variables });
          setSubmitting(false);

          if (_.isEmpty(errors)) {
            debugger;
            onSuccess();
          } else {
            _.each(errors, ({ path, message }) => {
              setFieldError(path[1], message);
            });
          }
        }}
        />
      )
    }
  </Mutation>
);

export default Register;
