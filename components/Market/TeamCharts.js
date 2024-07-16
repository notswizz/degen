// components/TeamCharts.js
import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TeamCharts = ({ transactions, teams }) => {
  const processTransactions = (transactions, teams) => {
    const teamMap = {};
    teams.forEach((team) => {
      teamMap[team.team] = team.logo;
    });

    const processedTeams = {};
    transactions.forEach((transaction) => {
      const teamName = transaction.team.name;
      if (!processedTeams[teamName]) {
        processedTeams[teamName] = { logo: teamMap[teamName], data: [] };
      }
      processedTeams[teamName].data.push({
        date: new Date(transaction.timestamp).toLocaleDateString(),
        price: transaction.price.newPrice,
      });
    });
    return processedTeams;
  };

  const teamData = processTransactions(transactions, teams);

  return (
    <Grid container spacing={4}>
      {Object.keys(teamData).map((teamName) => (
        <Grid item xs={12} sm={6} md={4} key={teamName}>
          <Paper sx={{ padding: 2, position: 'relative', overflow: 'hidden' }}>
           
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${teamData[teamName].logo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.6, // Adjust opacity as needed
                zIndex: 0,
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={teamData[teamName].data}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
             
                  <Tooltip />
          
                  <Line type="monotone" dataKey="price" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default TeamCharts;
