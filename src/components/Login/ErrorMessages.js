import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ErrorMessages = ({ errors }) => {
  if (_.isEmpty(errors)) {
    return null;
  }

  return (
    <ul>
      {
        _.map(errors, error => (
          <li>{ error }</li>
        ))
      }
    </ul>
  );
};

ErrorMessages.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

ErrorMessages.defaultProps = {
  errors: [],
};

export default ErrorMessages;
