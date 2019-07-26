import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const showSnackbar = ({ closeSnackbar, enqueueSnackbar }, message, variant) => {
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
  enqueueSnackbar(message, { action, variant });
};

export default showSnackbar;
