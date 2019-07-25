import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

import { userPropType } from 'components/CurrentUser';

const useStyles = makeStyles(theme => ({
  accountIcon: {
    marginRight: theme.spacing(1),
  },
  username: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
  },
  menuLink: {
    textDecoration: 'none',
    display: 'block',
    color: theme.palette.common.black,
  },
}));

const LoggedInUser = ({
  user,
  logout,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const menuId = 'primary-search-account-menu';

  const classes = useStyles();

  return (
    <>
      <Button
        edge="end"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle className={classes.accountIcon} />
        <span className={classes.username}>{ user.login }</span>
      </Button>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          Profile
        </MenuItem>
        <Link to="/projects/new" className={classes.menuLink}>
          <MenuItem onClick={handleMenuClose}>
            Create Project
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

LoggedInUser.propTypes = {
  user: userPropType.isRequired,
  logout: PropTypes.func.isRequired,
};

export default LoggedInUser;
