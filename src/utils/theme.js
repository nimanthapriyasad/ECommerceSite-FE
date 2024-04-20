import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ed6c02',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f1f2f4',
      paper: '#fff',
    },
    text: {
      primary: '#000',
      secondary: 'gray',
    },
  },
});

export default theme;
