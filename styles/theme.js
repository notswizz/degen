// styles/theme.js

import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const gold = '#c0a080'; // A custom gold color, replace with the hex code that matches your design

const theme = createTheme({
  palette: {
    primary: {
      main: gold, // Gold color for primary elements
    },
    secondary: {
      main: grey[900], // Dark grey for the AppBar background and secondary elements
    },
    error: {
      main: grey[500], // A neutral error color if needed
    },
    background: {
      default: grey[800], // A lighter grey for backgrounds
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      color: gold, // Gold for headers
    },
    button: {
      textTransform: 'none', // Keep text case regular
    },
  },
});

export default theme;
