import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { Formik, Field, Form } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';
import _ from 'lodash';

import LoginSchema from './Schema';
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
  login,
  onLogin,
}) => {
  const classes = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleError = (message) => {
    const action = key => (
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => { closeSnackbar(key); }}
      >
        <CloseIcon />
      </IconButton>
    );
    enqueueSnackbar(message, {
      action,
      variant: 'error',
    });
  };

  return (
    <Formik
      initialValues={{
        login: '',
        password: '',
        rememberMe: false,
      }}
      validationSchema={LoginSchema}
      onSubmit={async (variables, { setSubmitting, setFieldError }) => {
        let response;

        try {
          response = await login({ variables });
        } catch (error) {
          handleError(error.message);
          return;
        } finally {
          setSubmitting(false);
        }

        const { data: { login: { token, errors } } } = response;

        if (token) {
          onLogin(token);
        } else {
          setFieldError('general', _.map(errors, 'message'));
        }
      }}
    >
      {({
        isSubmitting,
        errors,
      }) => (
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
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
