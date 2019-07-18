import React from 'react';
import PropTypes from 'prop-types';
import Uploader from 'components/Uploader';

const ArchiveUploader = ({
  onStart,
  onProgress,
  onError,
  onFinish,
  ...props
}) => (
  <Uploader
    onStart={onStart}
    onProgress={onProgress}
    onError={onError}
    onFinish={onFinish}

    {...props}
  />
);

ArchiveUploader.propTypes = {
  onStart: PropTypes.func.isRequired,
  onProgress: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default ArchiveUploader;
