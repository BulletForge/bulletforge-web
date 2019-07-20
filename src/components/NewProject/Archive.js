import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';

import ArchiveUploader from './ArchiveUploader';
import UploadStatus from './UploadStatus';

const useStyles = makeStyles(theme => ({
  content: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
}));

const Archive = ({
  onStart,
  onFinish,
}) => {
  const [upload, setUpload] = useState({ progress: 0, status: 'Waiting' });
  const [showButton, setShowButton] = useState(true);
  const [showProgress, setShowProgress] = useState(false);

  const onBegin = () => {
    setUpload({ progress: 0, status: 'Waiting' });
    setShowButton(false);
    setShowProgress(true);
    onStart();
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
    setShowButton(true);
  };
  const onEnd = (directUpload) => {
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
      <Collapse in={showButton}>
        <ArchiveUploader
          onStart={onBegin}
          onProgress={onProgress}
          onError={onError}
          onFinish={onEnd}
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
