import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme, action }) => ({
  '& .MuiDialog-paper': {
    border: `3px solid ${action === 'buy' ? theme.palette.success.main : theme.palette.error.main}`,
    borderRadius: theme.shape.borderRadius,
  },
}));

const Confirm = ({ open, handleClose, handleConfirm, action, team }) => {
  return (
    <StyledDialog open={open} onClose={handleClose} action={action}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Confirm {action.charAt(0).toUpperCase() + action.slice(1)}</DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        <img src={team.logo} alt={team.team} style={{ width: '50px', height: '50px', marginBottom: '10px' }} />
        <DialogContentText sx={{ mb: 2 }}>
          Are you sure you want to {action} 1 share of the {team.team}?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleClose} variant="outlined" color="primary" sx={{ mx: 1 }}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained" color={action === 'buy' ? 'success' : 'error'} sx={{ mx: 1 }}>
          Confirm
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default Confirm;
