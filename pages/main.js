import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import NavBar from '../components/Common/NavBar';
import Market from '../components/Market/Market';

import axios from 'axios';


const MainPage = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('alphabetical');  // Define state here
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        const decoded = jwt.decode(savedToken);
        if (decoded) {
          setUser({ id: decoded.userId, username: decoded.username });
          setToken(savedToken);
        } else {
          router.push('/'); // Redirect to index.js if token is invalid
        }
      } else {
        router.push('/'); // Redirect to index.js if no token
      }

      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const [transactionsRes, teamsRes] = await Promise.all([
            axios.get(`/api/transactions?userId=${userId}`),
            axios.get('/api/teams'),
          ]);

          setTransactions(transactionsRes.data);
          setTeams(teamsRes.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [router]);

  const handleOpenTransactions = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID is missing');
      return;
    }

    try {
      const res = await axios.get(`/api/transactions?userId=${userId}`);
      setTransactions(res.data);
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <NavBar user={user} setUser={setUser} setToken={setToken} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Market 
          sortCriteria={sortCriteria} 
          setSortCriteria={setSortCriteria}  // Pass state and setter here
        />
      
      
      </Container>
    </>
  );
};

export default MainPage;
