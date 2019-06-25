import React from 'react';
import MuiTextField from '@material-ui/core/TextField';

const TextField = ({ InputLabelProps, ...rest }) => {
  const props = {
    ...rest,
    fullWidth: true,
    margin: 'normal',
    InputLabelProps: {
      ...InputLabelProps,
      shrink: true,
    },
  };

  return <MuiTextField {...props} />;
};

TextField.propTypes = MuiTextField.propTypes;
TextField.defaultProps = MuiTextField.defaultProps;

export default TextField;
