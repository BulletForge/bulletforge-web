import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '../components/TextField';

const Register = () => {
  const [username, updateUsername] = useState('');
  const [usernameError, updateUsernameError] = useState(false);

  const handleChange = (event) => {
    updateUsername(event.target.value);
  };

  const handleBlur = () => {
    updateUsername(username.trim());
    updateUsernameError(username === '');
  };

  return (
    <Container>
      <Typography variant="h3">Register</Typography>
      <form>
        <TextField
          label="Username"
          value={username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={usernameError}
          helperText={usernameError ? 'Can\'t be blank' : null}
        />
        <TextField label="Email" />
        <TextField label="Password" type="password" />
        <TextField label="Password Confirmation" type="password" />
        <Button variant="contained" color="primary">Register</Button>
      </form>
    </Container>
  );
};

export default Register;
