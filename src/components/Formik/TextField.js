import React from 'react';
import MuiTextField from '@material-ui/core/TextField';

export default ({
  field,
  form: {
    touched,
    errors,
  },
  ...props
}) => {
  const error = touched[field.name] && errors[field.name];
  const muiProps = {
    error,
    helperText: error,
    ...field,
    ...props,
  };
  return <MuiTextField {...muiProps} />;
};
