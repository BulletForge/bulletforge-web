import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import { darken, makeStyles } from '@material-ui/core/styles';

import Uploader from 'components/Uploader';

const useStyles = makeStyles(theme => ({
  fileInput: {
    width: '0.1px',
    height: '0.1px',
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1,
    '& + label': {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: 'white',
      backgroundColor: theme.palette.primary.main,
      display: 'inline-block',
      cursor: 'pointer',
    },
    '&:focus + label': {
      outline: '1px dotted #000',
      backgroundColor: darken(theme.palette.primary.main, 0.15),
    },
    '& + label:hover': {
      backgroundColor: darken(theme.palette.primary.main, 0.15),
    },
  },
}));

const ArchiveUploader = ({
  onStart,
  onFinish,
}) => {
  const classes = useStyles();

  const [upload, setUpload] = useState({ progress: 0, status: 'Waiting' });
  const onBegin = () => {
    setUpload({ progress: 0, status: 'Waiting' });
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
  };
  const onEnd = (directUpload) => {
    setUpload({
      ...upload,
      progress: 100,
      status: 'Finished',
    });
    onFinish(directUpload);
  };

  return (
    <>
      <Box fontWeight="fontWeightBold">
        <Uploader
          accept=".zip, .rar, .tar"
          onStart={onBegin}
          onProgress={onProgress}
          onError={onError}
          onFinish={onEnd}
          id="archive-input"
          className={classes.fileInput}
        />
        <label htmlFor="archive-input">
          Choose a file...
        </label>
      </Box>
      <p>
        {`${upload.status} ${upload.progress}%`}
      </p>
      <LinearProgress variant="determinate" value={upload.progress} />
    </>
  );
};

ArchiveUploader.propTypes = {
  onStart: PropTypes.func,
  onFinish: PropTypes.func,
};

/* eslint-disable no-console */
ArchiveUploader.defaultProps = {
  onStart: () => {
    console.log('Upload Started.');
  },
  onFinish: ({ signedBlobId }) => {
    console.log(`Upload Finished. Signed blob id: ${signedBlobId}`);
  },
};
/* eslint-enable no-console */

export default ArchiveUploader;
