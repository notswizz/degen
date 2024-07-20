import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';

const BalanceDisplay = ({ balance, username }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.default,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      {balance !== null && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(0.5, 1),
            borderRadius: '20px',
            background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginRight: theme.spacing(1),
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: theme.palette.common.white,
              fontWeight: 'bold',
              fontSize: '1.1rem',
            }}
          >
            ${balance.toFixed(2)}
          </Typography>
        </Box>
      )}
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.primary,
          fontWeight: 'bold',
        }}
      >
        {username}
      </Typography>
    </Box>
  );
};

export default BalanceDisplay;
