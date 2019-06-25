import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import RegisterSchema from './Schema';

const Register = () => (
  <Container>
    <Typography variant="h3">Register</Typography>

    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        isSubmitting,
      }) => (
        <Form>
          <Field
            label="Username"
            name="username"
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
  </Container>
);

export default Register;
