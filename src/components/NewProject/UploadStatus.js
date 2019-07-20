import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const UploadStatus = ({
  status,
  progress,
}) => (
  <>
    <Typography>
      {`${status} ${progress}%`}
    </Typography>
    <LinearProgress variant="determinate" value={progress} />
  </>
);

UploadStatus.propTypes = {
  status: PropTypes.string,
  progress: PropTypes.number,
};

/* eslint-disable no-console */
UploadStatus.defaultProps = {
  status: 'Waiting',
  progress: 0,
};
/* eslint-enable no-console */

export default UploadStatus;
