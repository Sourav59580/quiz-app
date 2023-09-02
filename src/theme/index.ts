import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import Orbitron from "../assets/fonts/Orbitron/Orbitron-Medium.ttf";
import Prompt from "../assets/fonts/Prompt/Prompt-Medium.ttf";


export const theme = createTheme({
  palette: {
    primary: {
      main: '#4C84FF',
    },
    success: {
      main: '#02E882'
    },
    secondary: {
      main: '#f2f2f2'
    },
    error: {
      main: '#FF3366'
    },
    background: {
      default: '#F5F6FA', // Set your background color here
    },
  },
  typography: {
    fontFamily: 'Prompt, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
            borderRadius: 3,
            boxShadow: 'none',
            '&:hover': {
                boxShadow: 'none',
            }
        },
      },
    },
  },
});
