import React from 'react';
import { MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

const MenuItems = ({ handleMenuClose }) => {
  const router = useRouter();

  const handleMenuItemClick = (path) => {
    router.push(path);
    handleMenuClose();
  };

  return (
    <>
      <MenuItem onClick={() => handleMenuItemClick('/main')}>Market</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick('/transactions')}>Transactions</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick('/withdraw')}>Withdraw</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick('/profile')}>Profile</MenuItem>
    </>
  );
};

export default MenuItems;
