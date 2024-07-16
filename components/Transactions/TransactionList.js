import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Paper, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Chip, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  borderLeft: `6px solid ${theme.palette.primary.main}`,
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '.MuiListItemText-primary': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  '.MuiListItemText-secondary': {
    color: theme.palette.text.secondary,
  },
}));

const PriceTag = styled(Box)(({ theme, trade }) => ({
  display: 'inline-block',
  backgroundColor: trade === 'buy' ? theme.palette.success.main : theme.palette.error.main,
  color: theme.palette.common.white,
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 'bold',
  marginTop: theme.spacing(1),
}));

const TransactionList = ({ transactions }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get('/api/teams');
        setTeams(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeams();
  }, []);

  const getTeamLogo = (teamId) => {
    const team = teams.find((team) => team._id === teamId);
    return team ? team.logo : '';
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  const filteredTransactions = selectedTeam
    ? transactions.filter((transaction) => transaction.team.id === selectedTeam)
    : transactions;

  const sortedTransactions = [...filteredTransactions].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h6" color="primary" sx={{ ml: 4 }}>
  {sortedTransactions.length}
</Typography>



        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Team</InputLabel>
          <Select
            value={selectedTeam}
            onChange={handleTeamChange}
            label="Filter by Team"
          >
            <MenuItem value="">All Teams</MenuItem>
            {teams.map((team) => (
              <MenuItem key={team._id} value={team._id}>{team.team}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ maxHeight: '70vh', overflow: 'auto' }}>
        {sortedTransactions.length > 0 ? (
          <List>
            {sortedTransactions.map((transaction) => {
              const timestamp = transaction.timestamp;
              const price = transaction.price?.[transaction.trade === 'buy' ? 'buyPrice' : 'sellPrice'];
              const shares = transaction.shares;
              const teamLogo = getTeamLogo(transaction.team.id);

              return (
                <StyledPaper key={transaction._id}>
                  <ListItem alignItems="flex-start" sx={{ width: '100%' }}>
                    <ListItemAvatar>
                      <Avatar alt={transaction.team.name} src={teamLogo} sx={{ width: 56, height: 56, marginRight: 2 }} />
                    </ListItemAvatar>
                    <StyledListItemText
                      primary={
                        <>
                          <span>
                            <Chip
                              label={transaction.trade.charAt(0).toUpperCase() + transaction.trade.slice(1)}
                              color={transaction.trade === 'buy' ? 'success' : 'error'}
                              size="small"
                              sx={{ marginRight: 1 }}
                            />
                            {`${shares} share(s) of ${transaction.team.name}`}
                          </span>
                        </>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="textPrimary">
                            {timestamp ? new Date(timestamp).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : 'Unknown Date'}
                          </Typography>
                          <br />
                          <PriceTag trade={transaction.trade}>
                            {transaction.trade.charAt(0).toUpperCase() + transaction.trade.slice(1)} Price: ${price}
                          </PriceTag>
                        </>
                      }
                    />
                  </ListItem>
                </StyledPaper>
              );
            })}
          </List>
        ) : (
          <Typography>No transactions found.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default TransactionList;
