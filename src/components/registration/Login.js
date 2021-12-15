import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useSelector, useDispatch} from 'react-redux';
import {logIn} from '../../redux/registration/registrationSlice';

const theme = createTheme();
export default function Login() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const acc = useSelector((state) => state.account.account_Address);
  const auth = useSelector((state) => state.register.isLogin);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    dispatch(logIn({password: data.get('password')}));
  };

  useEffect(() => {
    if (auth) nav('/');
  }, [auth]);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'success.main'}}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="account address"
                  fullWidth
                  id="acc-address"
                  label={acc}
                  defaultValue={acc}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Log in
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
