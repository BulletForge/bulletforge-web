import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

import ContentWrapper from './ContentWrapper';

const CustomizedSnackbars = ({
  open,
  onClose,
  variant,
  message,
}) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
  >
    <ContentWrapper
      onClose={onClose}
      variant={variant}
      message={message}
    />
  </Snackbar>
);

CustomizedSnackbars.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
  message: PropTypes.string,
};

CustomizedSnackbars.defaultProps = {
  message: '',
};

export default CustomizedSnackbars;
