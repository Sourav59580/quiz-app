import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getQuizData } from "../../store/quiz/quiz.api";
import { Link, Navigate } from "react-router-dom";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import QuizItem from "../../components/QuizItem";
import QuestionProfile from "../../components/Questionsprofile";

const Dashboard = () => {
  const dispatch = useDispatch<any>();
  const [user, isLoggedIn, quizData, submittedAnswers, isSubmitted] = useSelector(
    (state: any) => [
      state?.session?.user || {},
      state?.session?.isLoggedIn,
      state?.quiz.quizData,
      state?.quiz.submittedAnswers,
      state?.quiz.isSubmitted
    ],
    shallowEqual
  );

  useEffect(() => {
    if (!quizData || (quizData && quizData.length === 0))
      dispatch(getQuizData());
  }, [dispatch, quizData]);

  return (
    <>
      {isSubmitted && <Navigate to="/report" replace={true} />}
      <Grid
        container
        spacing={2}
        sx={{ height: "calc(100vh - 58px)", overflow: 'auto', marginTop: "0px" }}
      >
        <Grid
          item
          xs={12}
          md={9}
          sx={{ height: "calc(100vh - 58px)", overflow: "auto" }}
        >
          <Box sx={{ px: 3, py: 1, borderRadius: "3px" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={9}>
                QUESTIONS
              </Grid>
              <Grid item xs={6} md={1}></Grid>
              <Grid item xs={6} md={2}></Grid>
            </Grid>
          </Box>

          {quizData &&
            quizData.map((quiz: any, index: number) => {
              let isAnswered = false;
              if (submittedAnswers[index]) isAnswered = true;
              return <QuizItem quiz={quiz} index={index} isAnswered={isAnswered} key={quiz.id} />;
            })}
        </Grid>
        <Grid item xs={12} md={3} sx={{ height: "calc(100vh - 58px)", overflow: "auto", p: 2 }}>
          <QuestionProfile quizData={quizData} submittedAnswers={submittedAnswers}/>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
