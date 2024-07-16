import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Box, Typography, Paper, Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import Image from 'next/image';
import jwt from 'jsonwebtoken';
import NavBar from '../components/Common/NavBar';
import Register from '../components/Home/Register';
import Login from '../components/Home/Login';

const Home = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      const decoded = jwt.decode(savedToken);
      if (decoded) {
        setUser({ id: decoded.userId, username: decoded.username });
        setToken(savedToken);
        router.push('/main'); // Redirect to main if user is logged in
      }
    }
  }, [router]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleLogin = (token) => {
    const decoded = jwt.decode(token);
    if (decoded) {
      setUser({ id: decoded.userId, username: decoded.username });
      setToken(token);
      localStorage.setItem('token', token); // Save token to local storage
      localStorage.setItem('userId', decoded.userId); // Save user ID to local storage
      handleClose(); // Close the dialog
      router.push('/main'); // Redirect to main.js page
    }
  };

  return (
    <>
      <NavBar user={user} setUser={setUser} setToken={setToken} />
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 2 }}>
        <Box sx={{ position: 'relative', width: '100%', height: 400, mb: 2 }}>
          <Image
            src="/degen1.png"
            alt="Future"
            layout="fill"
            objectFit="cover"
            style={{ borderRadius: '8px' }}
          />
        </Box>
        {user ? (
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome, {user.username}
            </Typography>
          </Paper>
        ) : (
          <Typography variant="h6" sx={{ mt: 4 }}>
            Please <Button onClick={handleOpen} sx={{ textTransform: 'none' }}>login</Button> or <Button onClick={() => { setIsRegister(true); handleOpen(); }} sx={{ textTransform: 'none' }}>register</Button> to continue.
          </Typography>
        )}
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {isRegister ? <Register /> : <Login onLogin={handleLogin} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleForm} sx={{ color: 'primary.main' }}>
            {isRegister ? 'Have an account? Login' : "Don't have an account? Register"}
          </Button>
          <Button onClick={handleClose} color="inherit">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
