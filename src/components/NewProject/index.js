import React from 'react';
import { useSnackbar } from 'notistack';

import showSnackbar from 'utils/snackbar';

import Archive from './Archive';

export default () => {
  const snackbarHook = useSnackbar();

  const handleStart = (file) => {
    console.log(`Upload Started. File: ${file.name}`);
  };
  const handleFinish = ({ signedBlobId }) => {
    console.log(`Upload Finished. Signed blob id: ${signedBlobId}`);
  };
  const handleError = (message) => {
    showSnackbar(snackbarHook, message, 'error');
  };

  return (
    <Archive
      onStart={handleStart}
      onFinish={handleFinish}
      onError={handleError}
    />
  );
};
