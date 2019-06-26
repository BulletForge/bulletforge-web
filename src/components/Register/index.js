import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
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
          { error && <p>error.message</p> }
          <Form registerMutation={register} onSuccess={onSuccess} />
          <Link component={RouterLink} href="/login" variant="body2">
            {'Already have an account?'}
          </Link>
        </div>
      )
    }
  </Mutation>
);

Register.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default Register;
