import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

import ArchiveUploader from './ArchiveUploader';

export default () => {
  const [upload, setUpload] = useState({ progress: 0, status: 'Waiting' });
  const onStart = () => {
    setUpload({ progress: 0, status: 'Waiting' });
  };
  const onProgress = (progress, status) => {
    setUpload({
      ...upload,
      progress,
      status,
    });
  };
  const onError = (message) => {
    setUpload({
      ...upload,
      status: 'Error',
      error: message,
    });
  };
  const onFinish = (signedBlobId) => {
    setUpload({
      ...upload,
      progress: 100,
      status: 'Finished',
    });
  };

  return (
    <>
      <ArchiveUploader
        onStart={onStart}
        onProgress={onProgress}
        onError={onError}
        onFinish={onFinish}
        name="archive"
      />
      <p>
        {upload.status}
        {' '}
        {`${upload.progress}%`}
      </p>
      <LinearProgress variant="determinate" value={upload.progress} />
    </>
  );
};
