import React from 'react';
import { Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import Register from '../Home/Register';
import Login from '../Home/Login';

const AuthDialog = ({ open, handleOpen, handleClose, isRegister, toggleForm, handleLogin }) => (
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
);

export default AuthDialog;
