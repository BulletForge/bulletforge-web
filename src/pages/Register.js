import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Register from 'components/Register';

export default () => {
  const [success, updateSuccess] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">Register</Typography>
      {
        success
          ? <p>Check ya email!</p>
          : <Register onSuccess={() => updateSuccess(true)} />
      }
    </Container>
  );
};
