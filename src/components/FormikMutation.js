import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';

import useSnackbar from 'utils/snackbar';

const FormikMutation = ({
  mutation,
  onMutationSuccess,
  onSubmit,
  ...formikProps
}) => {
  const showSnackbar = useSnackbar();

  return (
    <Mutation mutation={mutation}>
      {
        mutate => (
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
        )
      }
    </Mutation>
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
