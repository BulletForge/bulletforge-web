import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Register from 'components/Register';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default () => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {
          success
            ? <p>Thank you for registering! Please check your email for a confirmation email.</p>
            : <Register onSuccess={() => setSuccess(true)} />
        }
      </div>
    </Container>
  );
};
