import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const UploadStatus = ({
  filename,
  status,
  progress,
}) => (
  <>
    <LinearProgress variant="determinate" value={progress} />
    <Grid container direction="row">
      <Grid item xs={4}>
        <Typography align="left" variant="subtitle2">
          {filename}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography align="center" variant="subtitle2">
          {status}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography align="right" variant="subtitle2">
          {`${progress}%`}
        </Typography>
      </Grid>
    </Grid>
  </>
);

UploadStatus.propTypes = {
  filename: PropTypes.string,
  status: PropTypes.string,
  progress: PropTypes.number,
};

/* eslint-disable no-console */
UploadStatus.defaultProps = {
  progress: 0,
  status: 'Waiting',
  filename: '',
};
/* eslint-enable no-console */

export default UploadStatus;
