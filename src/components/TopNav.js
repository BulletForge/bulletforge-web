import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import Link from 'components/Link';
import { CurrentUserConsumer } from 'components/CurrentUser';
import { clearAccessToken } from 'utils/accessToken';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

function PrimarySearchAppBar({ history, updateAccessToken }) {
  const classes = useStyles();

  const handleLogout = () => {
    clearAccessToken();
    updateAccessToken(null);
    history.replace('/');
  };

  return (
    <div className={classes.grow}>
      <CurrentUserConsumer>
        {
          user => (
            <AppBar position="static">
              <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                  <Link to="/" color="inherit">BulletForge</Link>
                </Typography>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'Search' }}
                  />
                </div>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  { !user && <Button color="inherit" component={RouterLink} to="/register">Register</Button> }
                  { !user && <Button color="inherit" component={RouterLink} to="/login">Login</Button> }
                  { user && <p>{`Hello! ${user.login}`}</p> }
                  { user && <Button color="inherit" onClick={handleLogout}>Logout</Button> }

                </div>
              </Toolbar>
            </AppBar>
          )
        }
      </CurrentUserConsumer>
    </div>
  );
}

export default withRouter(PrimarySearchAppBar);
