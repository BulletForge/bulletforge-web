import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack';

import Archive from './Archive';

export default () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleStart = (file) => {
    console.log(`Upload Started. File: ${file.name}`);
  };
  const handleFinish = ({ signedBlobId }) => {
    console.log(`Upload Finished. Signed blob id: ${signedBlobId}`);
  };
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
    <Archive
      onStart={handleStart}
      onFinish={handleFinish}
      onError={handleError}
    />
  );
};
