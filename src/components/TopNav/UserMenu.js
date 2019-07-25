import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useCurrentUser } from 'components/CurrentUser';
import GuestUser from './GuestUser';
import LoggedInUser from './LoggedInUser';

const useStyles = makeStyles(() => ({
  flex: {
    display: 'flex',
  },
}));

const UserMenu = () => {
  const classes = useStyles();
  const {
    user,
    loading,
    error,
    logout,
  } = useCurrentUser();

  return (
    !loading && !error
    && (
      <div className={classes.flex}>
        { user
          ? <LoggedInUser user={user} logout={logout} />
          : <GuestUser />
        }
      </div>
    )
  );
};

export default UserMenu;
