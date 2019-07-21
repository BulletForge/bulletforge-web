import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Uploader from 'components/Uploader';

const useStyles = makeStyles(theme => ({
  dropzone: {
    width: '50%',
    height: theme.spacing(20),
    borderStyle: 'dashed',
    borderColor: 'grey',
    position: 'relative',
    margin: '0 auto',
    cursor: 'pointer',
    display: 'block-inline',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 5,
    '& div': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: theme.spacing(-5),
      marginLeft: '-12.5%',
      zIndex: 1,
    },
  },
  constraints: {
    marginTop: theme.spacing(2),
  },
}));

const ArchiveUploader = ({
  accept,
  maxSizeInMegabytes,
  ...props
}) => {
  const classes = useStyles();

  const maxSize = maxSizeInMegabytes * 1024 * 1024;

  return (
    <Box textAlign="center">
      <Uploader
        accept={accept}
        className={classes.dropzone}
        style={{}}
        maxSize={maxSize}
        {...props}
      >
        <div>
          <Typography>Drag and drop a file</Typography>
          <Typography>or</Typography>
          <Typography>Click to browse</Typography>
        </div>
      </Uploader>
      <div className={classes.constraints}>
        <Typography variant="subtitle2">{`Accepted filetypes: ${accept}`}</Typography>
        <Typography variant="subtitle2">{`File size limit: ${maxSizeInMegabytes} MB`}</Typography>
      </div>
    </Box>
  );
};

ArchiveUploader.propTypes = {
  accept: PropTypes.string.isRequired,
  maxSizeInMegabytes: PropTypes.number.isRequired,
};

export default ArchiveUploader;
