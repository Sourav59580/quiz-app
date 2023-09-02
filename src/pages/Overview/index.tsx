import React from 'react'
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { startQuiz } from '../../store/quiz'
import { Navigate } from 'react-router-dom';

import { Box, Button, Stack, Typography, TextField } from "@mui/material";
import Logo from "../../assets/images/logo.png";


const Overview = () => {
  const dispatch = useDispatch<any>();

  const handelStartQuiz = () => {
    dispatch(startQuiz(true));
  };


  const [hasStarted, quizStarted] = useSelector(
    (state: any) => [state?.quiz?.hasStarted, state?.quiz?.quizStarted],
    shallowEqual
  );
  console.log("hasStarted: ", hasStarted);


  return (
    <Stack justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      {hasStarted && <Navigate to="/dashboard" replace={true} />}
      <img src={Logo} alt="logo" loading="lazy" style={{ width: "100px" }} />
      <Typography variant="h5" sx={{ my: 2 }}>
          Take our assessment
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}> A step-by-step description of the actions to be taken during the test, <br/> including user interactions or inputs. These steps should be clear and unambiguous.</Typography>
      <Button variant="contained" onClick={handelStartQuiz}>Start Quiz</Button>
    </Stack>
  )
}

export default Overview;