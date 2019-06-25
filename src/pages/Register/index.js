import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
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
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && errors.username}
            helperText={touched.username && errors.username}
          />

          <TextField
            label="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
            helperText={touched.password && errors.password}
          />

          <TextField
            label="Password Confirmation"
            type="password"
            name="passwordConfirmation"
            value={values.passwordConfirmation}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.passwordConfirmation && errors.passwordConfirmation}
            helperText={touched.passwordConfirmation && errors.passwordConfirmation}
          />

          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            type="submit"
          >
              Register
          </Button>
        </form>
      )}
    </Formik>
  </Container>
);

export default Register;
