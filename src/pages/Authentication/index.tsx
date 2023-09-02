import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { signIn } from "../../store/session";
import { Navigate } from "react-router-dom";
import { Box, Button, Stack, Typography, TextField } from "@mui/material";
import Logo from "../../assets/images/logo.png";

const Authentication = () => {
  const dispatch = useDispatch<any>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isLoggedIn] = useSelector(
    (state: any) => [state?.session?.isLoggedIn],
    shallowEqual
  );
  console.log("isLoggedIn: ", isLoggedIn);

  const signin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(signIn({ name, email }));
  };

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      {isLoggedIn && <Navigate to="/overview" replace={true} />}
      <Box
        sx={{ width: "400px", background: "#fff", borderRadius: "4px", p: 4 }}
      >
        <img src={Logo} alt="logo" loading="lazy" style={{ width: "100px" }} />
        <Typography variant="h5" sx={{ my: 2 }}>
          Take our assessment
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Thanks for your interest in this position! Please provide your name
          and email address.
        </Typography>

        <form onSubmit={signin} name="signin_form">
          <TextField
            required
            id="outlined-name"
            label="Name"
            variant="outlined"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            sx={{mb: 2, width: '100%' }}
          />

          <TextField
            type="email"
            required
            id="outlined-email"
            label="Email"
            variant="outlined"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3, width: '100%'}}
          />

          <Button variant="contained" type="submit" sx={{ display: "block", margin: 'auto' }}>
            Submit
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default Authentication;
