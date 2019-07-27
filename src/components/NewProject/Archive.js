import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';

import ArchiveUploader from './ArchiveUploader';
import UploadStatus from './UploadStatus';

const Archive = ({
  onFinish,
  onError,
}) => {
  const [upload, setUpload] = useState({});
  const [showUploader, setShowUploader] = useState(true);
  const [showProgress, setShowProgress] = useState(false);

  const handleStart = (file) => {
    setUpload({
      filename: file.name,
      status: 'Initializing',
      progress: 0,
    });
    setShowUploader(false);
    setShowProgress(true);
  };
  const handleProgress = (progress, status) => {
    setUpload({
      ...upload,
      progress,
      status,
    });
  };
  const handleError = (message) => {
    setUpload({
      ...upload,
      error: message,
      status: 'Error',
    });
    setShowUploader(true);
    onError(message);
  };
  const handleFinish = (directUpload) => {
    setUpload({
      ...upload,
      progress: 100,
      status: 'Finished',
    });
    onFinish(directUpload);
  };

  return (
    <>
      <Collapse in={showUploader}>
        <ArchiveUploader
          maxSizeInMegabytes={300}
          accept=".zip, .rar, .tar, .7z"
          onStart={handleStart}
          onProgress={handleProgress}
          onError={handleError}
          onFinish={handleFinish}
        />
      </Collapse>
      <Collapse in={showProgress}>
        <UploadStatus {...upload} />
      </Collapse>
    </>
  );
};

Archive.propTypes = {
  onFinish: PropTypes.func,
  onError: PropTypes.func,
};

/* eslint-disable no-console */
Archive.defaultProps = {
  onFinish: ({ signedBlobId }) => {
    console.log(`Upload Finished. Signed blob id: ${signedBlobId}`);
  },
  onError: (message) => {
    console.log(`${message}`);
  },
};
/* eslint-enable no-console */

export default Archive;
