import { Box, Grid, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const QuizItem = (props: any) => {
  const { quiz, index, isAnswered } = props;
  return (
    <Box
      sx={{ m: 2, p: 2, background: "#fff", borderRadius: "3px" }}
      key={quiz.id}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          {index + 1}.{" "}
          <Link
            to={`/quiz/${index}`}
            style={{ textDecoration: "none", color: "#000" }}
          >
            {quiz.question}
          </Link>
        </Grid>
        <Grid item xs={6} md={1}></Grid>
        <Grid item xs={6} md={2}>
          <Link to={`/quiz/${index}`}>
            <Button color="success" variant="contained" sx={{ color: "#fff" }}>
              {isAnswered ? "Modify": "Solve"}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuizItem;
