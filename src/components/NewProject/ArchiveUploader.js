import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { CloudUpload } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import Uploader from 'components/Uploader';

const useStyles = makeStyles(theme => ({
  fileInput: {
    display: 'none',
    '&:focus + label': {
      outline: '1px dotted #000',
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const ArchiveUploader = ({
  ...props
}) => {
  const classes = useStyles();

  return (
    <>
      <Box>
        <Uploader
          accept=".zip, .rar, .tar"
          id="archive-input"
          className={classes.fileInput}
          {...props}
        />
        <label htmlFor="archive-input">
          <Button size="large" color="primary" variant="contained" component="span">
            <CloudUpload className={classes.icon}>
              Upload
            </CloudUpload>
            Upload file
          </Button>
        </label>
      </Box>
    </>
  );
};

export default ArchiveUploader;
