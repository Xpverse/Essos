import React from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#00796B', 
    },
  },
});

const LoginPage = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    
    alert('Login clicked!');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to right, #00796B, #43A047)',
        }}
      >
        <Container component="main" maxWidth="xs">
          <Paper elevation={10} sx={{ padding: 4, borderRadius: 3, boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.2)' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#00796B' }}>
                Login
              </Typography>
              <form onSubmit={handleLogin} style={{ width: '100%' }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  sx={{ borderRadius: 2 }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  sx={{ borderRadius: 2 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ marginTop: 2, backgroundColor: '#00796B', color: 'white', '&:hover': { backgroundColor: '#005B4C' } }}
                >
                  Login
                </Button>
              </form>
            </Box>
          </Paper>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: 'white' }}>
            Don't have an account? <a href="#" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>Sign Up</a>
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
