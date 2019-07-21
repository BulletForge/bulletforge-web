import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';

import ArchiveUploader from './ArchiveUploader';
import UploadStatus from './UploadStatus';

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: theme.spacing(2),
  },
}));

const Archive = ({
  onStart,
  onFinish,
}) => {
  const [upload, setUpload] = useState({ progress: 0, status: 'Waiting' });
  const [showUploader, setShowUploader] = useState(true);
  const [showProgress, setShowProgress] = useState(false);

  const handleStart = () => {
    setUpload({ progress: 0, status: 'Waiting' });
    setShowUploader(false);
    setShowProgress(true);
    onStart();
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
      status: 'Error',
      error: message,
    });
    setShowUploader(true);
  };
  const handleFinish = (directUpload) => {
    setUpload({
      ...upload,
      progress: 100,
      status: 'Finished',
    });
    onFinish(directUpload);
  };

  const classes = useStyles();

  return (
    <div className={classes.content}>
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
    </div>
  );
};

Archive.propTypes = {
  onStart: PropTypes.func,
  onFinish: PropTypes.func,
};

/* eslint-disable no-console */
Archive.defaultProps = {
  onStart: () => {
    console.log('Upload Started.');
  },
  onFinish: ({ signedBlobId }) => {
    console.log(`Upload Finished. Signed blob id: ${signedBlobId}`);
  },
};
/* eslint-enable no-console */

export default Archive;
