import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import BalanceDisplay from './BalanceDisplay';
import AuthDialog from './AuthDialog';
import MenuItems from './MenuItems';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const NavBar = ({ user, setUser, setToken, updateBalanceAfterPurchase }) => {
  const theme = useTheme();
  const [isRegister, setIsRegister] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [balance, setBalance] = useState(null);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toggleForm = () => setIsRegister(!isRegister);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const fetchBalance = async (userId) => {
    try {
      const response = await axios.get(`/api/balance?userId=${userId}`);
      return Math.round(response.data.balance * 100) / 100;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return null;
    }
  };

  const handleLogin = async (token) => {
    const decoded = jwt.decode(token);
    if (decoded) {
      const fetchedBalance = await fetchBalance(decoded.userId);
      setUser({ id: decoded.userId, username: decoded.username });
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', decoded.userId);
      setBalance(fetchedBalance);
      handleClose();
      router.push('/main');
    } else {
      console.error("Failed to decode JWT token");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken('');
    setBalance(null);
    router.push('/');
  };

  useEffect(() => {
    if (user) {
      fetchBalance(user.id).then(setBalance);
    }
  }, [user]);

  return (
    <AppBar position="static" color="secondary" sx={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItems handleMenuClose={handleMenuClose} />
        </Menu>
        <Typography variant="h8" sx={{ flexGrow: 1, color: 'primary.main' }}>
          Degen Futures
        </Typography>
        {user ? (
          <>
            <BalanceDisplay balance={balance} username={user.username} theme={theme} />
            <IconButton color="inherit" onClick={handleLogout} sx={{ marginLeft: 'auto' }}>
              <LogoutIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </>
        ) : (
          <AuthDialog
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            isRegister={isRegister}
            toggleForm={toggleForm}
            handleLogin={handleLogin}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
