import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RegisterSchema from './Schema';

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
  registerMutation,
  onSuccess,
}) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        login: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={async (variables, { setSubmitting, setFieldError }) => {
        const { data: { register: { errors } } } = await registerMutation({ variables });
        setSubmitting(false);
        if (_.isEmpty(errors)) {
          onSuccess();
        } else {
          _.each(errors, ({ path, message }) => {
            setFieldError(path[1], message);
          });
        }
      }}
    >
      {({
        isSubmitting,
      }) => (
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
      )}
    </Formik>
  );
};

RegisterForm.propTypes = {
  registerMutation: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default RegisterForm;
