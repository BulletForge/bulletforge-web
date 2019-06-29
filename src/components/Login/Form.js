import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import LoginSchema from './Schema';


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
  loginMutation,
  onSuccess,
}) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        login: '',
        password: '',
        rememberMe: false,
      }}
      validationSchema={LoginSchema}
      onSubmit={async (variables, { setSubmitting, setFieldError }) => {
        const { data: { login: { token, errors } } } = await loginMutation({ variables });
        setSubmitting(false);
        if (_.isEmpty(errors)) {
          onSuccess();
          alert(token);
        } else {
          setFieldError('general', errors[0].message);
        }
      }}
    >
      {({
        isSubmitting,
      }) => (
        <Form className={classes.form} noValidate>
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
  loginMutation: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default LoginForm;
