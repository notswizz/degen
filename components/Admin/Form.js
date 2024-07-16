import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

const Form = () => {
  const [team, setTeam] = useState('');
  const [logo, setLogo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/teams', { team, logo, shares: 0, price: 1 });
      setMessage(res.data.message);
      setTeam('');
      setLogo('');
      window.location.reload();
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper 
        elevation={5} 
        sx={{ 
          p: 4, 
          mt: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          backgroundColor: '#2e2e2e', 
          color: '#fff',
          borderRadius: '12px'
        }}
      >
        <Typography component="h1" variant="h5">
          Add Team
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="team"
            label="Team"
            name="team"
            autoFocus
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            InputLabelProps={{
              style: { color: '#fff' }
            }}
            sx={{ input: { color: '#fff' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#aaa' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="logo"
            label="Logo URL"
            name="logo"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            InputLabelProps={{
              style: { color: '#fff' }
            }}
            sx={{ input: { color: '#fff' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#aaa' }, '&.Mui-focused fieldset': { borderColor: '#fff' } } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: 'secondary.main', color: '#fff', '&:hover': { backgroundColor: 'secondary.dark' } }}
          >
            Add Team
          </Button>
          {message && <Typography color="error">{message}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default Form;
