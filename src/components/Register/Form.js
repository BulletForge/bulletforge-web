import React from 'react';
import Button from '@material-ui/core/Button';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import RegisterSchema from './Schema';

export default ({
  onSubmit,
}) => (
  <Formik
    initialValues={{
      login: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    }}
    validationSchema={RegisterSchema}
    onSubmit={onSubmit}
  >
    {({
      isSubmitting,
    }) => (
      <Form>
        <Field
          label="Login"
          name="login"
          component={TextField}
        />

        <Field
          label="Email"
          type="email"
          name="email"
          component={TextField}
        />

        <Field
          label="Password"
          type="password"
          name="password"
          component={TextField}
        />

        <Field
          label="Password Confirmation"
          type="password"
          name="passwordConfirmation"
          component={TextField}
        />

        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          type="submit"
        >
        Register
        </Button>
      </Form>
    )}
  </Formik>
);
