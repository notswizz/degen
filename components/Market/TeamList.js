import React, { useState } from 'react';
import { Grid } from '@mui/material';
import TeamCard from './TeamCard';
import TeamCharts from './TeamCharts';

const TeamList = ({ teams, handleOpen, portfolio }) => {
  const [showCharts, setShowCharts] = useState({});

  const handleToggleChart = (teamId) => {
    setShowCharts((prev) => ({
      ...prev,
      [teamId]: !prev[teamId],
    }));
  };

  return (
    <Grid container spacing={4}>
      {teams.map((team) => (
        <Grid item xs={12} sm={6} md={4} key={team._id}>
          {showCharts[team._id] ? (
            <TeamCharts
              team={team}
              showChart={showCharts[team._id]}
              setShowChart={() => handleToggleChart(team._id)}
            />
          ) : (
            <TeamCard
              team={team}
              handleOpen={handleOpen}
              portfolio={portfolio}
              showChart={showCharts[team._id]}
              setShowChart={() => handleToggleChart(team._id)}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default TeamList;
