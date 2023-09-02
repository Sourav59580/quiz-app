import { FC, ReactNode, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Box, Tooltip, Stack, Typography, IconButton, Button } from "@mui/material";
import Logo from "../../assets/images/logo.png";
import AppsIcon from "@mui/icons-material/Apps";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Header = (props: any) => {
  const { timeLeft, updateTimeLeft, finishQuiz, dispatch, clearPersistedData } = props;

  const [minutes, setMinutes] = useState(timeLeft.minutes);
  const [seconds, setSeconds] = useState(timeLeft.seconds);
  // Update the timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
        dispatch(finishQuiz()) // Stop the timer when it reaches zero
      } else {
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }

        dispatch(updateTimeLeft({ timeLeft: {minutes, seconds} }));
      }
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, [minutes, seconds]);


  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return (
    <Box
      sx={{
        flex: 1,
        height: "58px",
        backgroundColor: "#FFFFFF",
        boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
      }}
    >
      <Stack
        sx={{ height: "100%", px: 3 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <img src={Logo} alt="logo" loading="lazy" style={{ width: "75px" }} />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>{formattedMinutes}:{formattedSeconds}</Typography>
        </Box>
        <Box>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Dashboard">
              <Link to="/dashboard">
                <IconButton sx={{ mr: 2 }}>
                  <AppsIcon />
                </IconButton>
              </Link>
            </Tooltip>
            <Box
              sx={{
                width: "25px",
                height: "25px",
                borderRadius: "4px",
                background: "#d7d7d7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {/* <PersonOutlineIcon sx={{ fontSize: '18px'}}/> */}
            </Box>

            <Button sx={{ ml: 2 }} onClick={clearPersistedData}>Logout</Button>
            
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Header;
