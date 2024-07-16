import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import { styled } from '@mui/material/styles';

const PriceTag = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.white,
  borderRadius: '4px',
  padding: theme.spacing(1, 2.5),
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  fontSize: '1rem',
  border: `2px solid ${theme.palette.primary.main}`,
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-20px',  // Adjust this to make the triangle bigger/smaller
    width: 0,
    height: 0,
    borderLeft: '15px solid transparent',
    borderRight: '15px solid ' + theme.palette.secondary.main,
    borderTop: '15px solid ' + theme.palette.secondary.main,
    borderBottom: '15px solid transparent',
  },
}));

const TeamName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(0.5),
  color: theme.palette.primary.main,
  fontSize: '1.2rem',
  textAlign: 'center',
  textTransform: 'uppercase',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#2e2e2e',
  color: '#fff',
  borderRadius: '12px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  border: `2px solid ${theme.palette.primary.main}`,
}));

const TeamCard = ({ team, handleOpen, portfolio }) => {
  return (
    <StyledPaper>
      <PriceTag>${team.price}</PriceTag>
      <img src={team.logo} alt={team.team} style={{ 
        width: '100%', 
        height: 'auto', 
        marginBottom: '1rem', 
        borderRadius: '22px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s',
        border: '6px solid #c0a080'  // Add your primary color here
      }} 
      />
      <TeamName variant="h6">
        {team.team}
      </TeamName>
      <Box 
        sx={{ 
          mt: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%',
          padding: '0 16px'  // Add padding for better spacing
        }}
      >
        <Button 
          variant="contained" 
          color="success" 
          startIcon={<ShoppingCartIcon />} 
          onClick={() => handleOpen(team, 'buy')}
          sx={{ 
            flexGrow: 1, 
            marginRight: 1,  // Adjust the right margin
            padding: '10px 20px',  // Add padding for better appearance
            textTransform: 'none'  // Keep text as is
          }}
        >
          Buy
        </Button>
        {portfolio.some(p => p.teamId === team._id) && (
          <Button 
            variant="contained" 
            color="error" 
            startIcon={<SellIcon />} 
            onClick={() => handleOpen(team, 'sell')}
            sx={{ 
              flexGrow: 1, 
              marginLeft: 1,  // Adjust the left margin
              padding: '10px 20px',  // Add padding for better appearance
              textTransform: 'none'  // Keep text as is
            }}
          >
            Sell
          </Button>
        )}
      </Box>
    </StyledPaper>
  );
};

export default TeamCard;
