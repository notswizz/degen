import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Typography, Box } from '@mui/material';
import TransactionList from '../components/Transactions/TransactionList';
import NavBar from '../components/Common/NavBar';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const router = useRouter();

  // Fetch transactions only once
  const fetchTransactions = useCallback(async () => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await axios.get(`/api/transactions?userId=${userId}`);
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Check for token and set user state
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      const decoded = jwt.decode(savedToken);
      if (decoded) {
        setUser({ id: decoded.userId, username: decoded.username });
        setToken(savedToken);
        localStorage.setItem('userId', decoded.userId);
      } else {
        router.push('/'); // Redirect to index.js if token is invalid
      }
    } else {
      router.push('/'); // Redirect to index.js if no token
    }
  }, [router]);

  // Fetch transactions when user is set
  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user, fetchTransactions]);

  return (
    <>
      <NavBar user={user} setUser={setUser} setToken={setToken} />
      <Container maxWidth="lg" sx={{  height: '90vh', overflow: 'auto' }}>
        <Box mb={2}>
        
        </Box>
        <TransactionList transactions={transactions} />
      </Container>
    </>
  );
};

export default TransactionsPage;
