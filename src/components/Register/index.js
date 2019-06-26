import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
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
  <Mutation mutation={registerMutation}>
    {
      (register, { error }) => (
        <div>
          <Form registerMutation={register} onSuccess={onSuccess} />
          { error && <p>error.message</p> }
        </div>
      )
    }
  </Mutation>
);

Register.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default Register;
