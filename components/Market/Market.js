import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import MarketTitle from './MarketTitle';
import TeamList from './TeamList';
import Confirm from './Confirm';

const Market = ({ sortCriteria, setSortCriteria }) => {
  const [teams, setTeams] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [action, setAction] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get('/api/teams');
        setTeams(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPortfolio = async () => {
      const userId = localStorage.getItem('userId'); // Ensure user ID is stored in local storage
      if (!userId) {
        console.error('User ID is missing');
        return;
      }

      try {
        const res = await axios.get(`/api/portfolio?userId=${userId}`);
        setPortfolio(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeams();
    fetchPortfolio();
  }, []);

  useEffect(() => {
    if (sortCriteria === 'priceHighLow') {
      setTeams((prevTeams) => [...prevTeams].sort((a, b) => b.price - a.price));
    } else if (sortCriteria === 'priceLowHigh') {
      setTeams((prevTeams) => [...prevTeams].sort((a, b) => a.price - b.price));
    } else if (sortCriteria === 'alphabetical') {
      setTeams((prevTeams) => [...prevTeams].sort((a, b) => a.team.localeCompare(b.team)));
    }
  }, [sortCriteria]);

  const handleOpen = (team, action) => {
    setSelectedTeam(team);
    setAction(action);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (action === 'buy') {
      await handleBuy(selectedTeam._id);
    } else if (action === 'sell') {
      await handleSell(selectedTeam._id);
    }
    setOpen(false);
  };

  const handleBuy = async (teamId) => {
    try {
      const userId = localStorage.getItem('userId'); // Ensure user ID is stored in local storage
      if (!userId) {
        throw new Error('User ID is missing');
      }

      const res = await axios.post('/api/buy', { teamId, userId });
      if (res.status === 200) {
        // Update the local state to reflect the new shares and price
        setTeams((prevTeams) => prevTeams.map(team => {
          if (team._id === teamId) {
            return { ...team, shares: res.data.newShares, price: res.data.newPrice };
          }
          return team;
        }));
        // Refresh portfolio
        await fetchPortfolio();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSell = async (teamId) => {
    try {
      const userId = localStorage.getItem('userId'); // Ensure user ID is stored in local storage
      if (!userId) {
        throw new Error('User ID is missing');
      }

      const res = await axios.post('/api/sell', { teamId, userId });
      if (res.status === 200) {
        // Update the local state to reflect the new shares and price
        setTeams((prevTeams) => prevTeams.map(team => {
          if (team._id === teamId) {
            return { ...team, shares: res.data.newShares, price: res.data.newPrice };
          }
          return team;
        }));
        // Refresh portfolio
        await fetchPortfolio();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4, height: '80vh', overflow: 'auto' }}>
      <MarketTitle sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} />
      <TeamList teams={teams} handleOpen={handleOpen} portfolio={portfolio} />
      {selectedTeam && (
        <Confirm
          open={open}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
          action={action}
          team={selectedTeam}
        />
      )}
    </Container>
  );
};

export default Market;
