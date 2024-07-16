// TeamList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Paper } from '@mui/material';

const TeamList = () => {
  const [teams, setTeams] = useState([]);

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

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Team List
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {teams.map((team) => (
          <Paper key={team._id} elevation={3} sx={{ m: 2, p: 2, width: '200px', textAlign: 'center', backgroundColor: '#2e2e2e', color: '#fff' }}>
            <img src={team.logo} alt={team.team} style={{ width: '100%', height: 'auto' }} />
            <Typography variant="h6">{team.team}</Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default TeamList;
