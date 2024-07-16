import React from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const MarketTitle = ({ sortCriteria, setSortCriteria }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" mb={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Market
      </Typography>
      <FormControl variant="outlined" sx={{ minWidth: 50 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          label="Sort By"
        >
                    <MenuItem value="alphabetical">ABC</MenuItem>
          <MenuItem value="priceHighLow">$$$ - $</MenuItem>
          <MenuItem value="priceLowHigh">$ - $$$</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
};

export default MarketTitle;
