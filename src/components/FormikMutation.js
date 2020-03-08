import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';

import useSnackbar from 'utils/snackbar';

const FormikMutation = ({
  mutation,
  onMutationSuccess,
  onSubmit,
  ...formikProps
}) => {
  const showSnackbar = useSnackbar();
  const [mutate] = useMutation(mutation);

  return (
    <Formik
      {...formikProps}
      onSubmit={async (variables, actions) => {
        if (onSubmit) { onSubmit(variables, actions); }

        let response;

        try {
          response = await mutate({ variables });
        } catch (error) {
          showSnackbar(error.message, 'error');
          return;
        } finally {
          actions.setSubmitting(false);
        }

        if (onMutationSuccess) { onMutationSuccess(response, actions); }
      }}
    />
  );
};

FormikMutation.propTypes = {
  mutation: PropTypes.exact({
    definitions: PropTypes.array,
    kind: PropTypes.string,
    loc: PropTypes.object,
  }).isRequired,
  onMutationSuccess: PropTypes.func,
  onSubmit: PropTypes.func,
};

FormikMutation.defaultProps = {
  onMutationSuccess: null,
  onSubmit: null,
};

export default FormikMutation;
