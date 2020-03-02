import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar as useNotistack } from 'notistack';

const useSnackbar = () => {
  const { closeSnackbar, enqueueSnackbar } = useNotistack();

  const showSnackbar = (message, variant) => {
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

  return showSnackbar;
};

export default useSnackbar;
