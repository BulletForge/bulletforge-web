import React from 'react';
import MuiLink from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

export default (props) => {
  const muiLinkProps = {
    component: RouterLink,
    ...props,
  };

  return <MuiLink {...muiLinkProps} />;
};
