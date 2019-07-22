import React, { useState } from 'react';

import Snackbar from 'components/Snackbar';
import Archive from './Archive';

export default () => {
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleStart = (file) => {
    console.log(`Upload Started. File: ${file.name}`);
  };
  const handleFinish = ({ signedBlobId }) => {
    console.log(`Upload Finished. Signed blob id: ${signedBlobId}`);
  };
  const handleError = (message) => {
    setError(message);
    setOpenSnackbar(true);
  };
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <Archive
        onStart={handleStart}
        onFinish={handleFinish}
        onError={handleError}
      />
      <Snackbar
        open={openSnackbar}
        onClose={handleCloseError}
        variant="error"
        message={error}
      />
    </>
  );
};
