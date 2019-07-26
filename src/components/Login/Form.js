import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { Field, Form } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';

import ErrorMessages from './ErrorMessages';


const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = ({
  errors,
  isSubmitting,
}) => {
  const classes = useStyles();

  return (
    <Form className={classes.form} noValidate>
      <ErrorMessages errors={errors.general} />
      <Field
        required
        label="Username"
        name="login"
        autoComplete="login"
        autoFocus
        component={TextField}
      />
      <Field
        required
        label="Password"
        name="password"
        autoComplete="current-password"
        type="password"
        component={TextField}
      />
      <FormControlLabel
        control={(
          <Field
            name="rememberMe"
            color="primary"
            component={Checkbox}
          />
        )}
        label="Remember me"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={isSubmitting}
      >
        Sign In
      </Button>
    </Form>
  );
};

LoginForm.propTypes = {
  errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default LoginForm;
