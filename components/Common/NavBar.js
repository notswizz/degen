import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Dialog, DialogContent, DialogActions, Menu, MenuItem } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import MenuIcon from '@mui/icons-material/Menu';
import Register from '../Home/Register';
import Login from '../Home/Login';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = ({ user, setUser, setToken }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken('');
    router.push('/'); // Redirect to index.js page
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    router.push(path);
    handleMenuClose();
  };

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleMenuItemClick('/main')}>Market</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/transactions')}>Transactions</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/withdraw')}>Withdraw</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/profile')}>Profile</MenuItem>
        </Menu>
        <Typography variant="h6" sx={{ flexGrow: 1, color: 'primary.main' }}>
          Degen Futures
        </Typography>
        {user ? (
          <>
            <Typography variant="h6" sx={{ color: 'primary.main', mr: 2 }}>
              {user.username}
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={handleOpen}>
              {isRegister ? 'Register' : 'Login'}
            </Button>
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
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
