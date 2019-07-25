import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegisterForm = ({
  isSubmitting,
}) => {
  const classes = useStyles();

  return (
    <Form className={classes.form}>
      <Field
        label="Login"
        name="login"
        component={TextField}
        required
      />

      <Field
        label="Email"
        type="email"
        name="email"
        component={TextField}
        required
      />

      <Field
        label="Password"
        type="password"
        name="password"
        component={TextField}
        required
      />

      <Field
        label="Password Confirmation"
        type="password"
        name="passwordConfirmation"
        component={TextField}
        required
      />

      <Button
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        type="submit"
        className={classes.submit}
        fullWidth
      >
        Register
      </Button>
    </Form>
  );
};

RegisterForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
};

export default RegisterForm;
