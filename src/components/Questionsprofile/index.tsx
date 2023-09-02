import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { wrap } from "module";

const QuestionProfile = (props: any) => {
  const { quizData, submittedAnswers, currentQuestion } = props;
  return (
    <Box sx={{ p: 3, background: "#fff" }}>
      <Typography sx={{ textAlign: "center", fontWeight: 600, mb: 3 }}>
        YOU ARE VIEWING QUIZ SECTION
      </Typography>

      <Typography sx={{ mb: 1 }}>Questions profile:</Typography>
      <Stack direction="row" flexWrap="wrap" sx={{ mb: 2 }}>
        {quizData &&
          quizData.map((quiz: any, index: number) => {
            let bgColor = "#f2f2f2";
            let color = "#000000";
            let border = "2px solid #fff";
            if (submittedAnswers[index]) {
              bgColor = "#02E882";
              color = "#fff";
            }

            if (
              (currentQuestion || currentQuestion === 0) &&
              currentQuestion === index
            )
              border = "2px solid #FF3366";

            return (
              <Link
                to={`/quiz/${index}`}
                style={{ textDecoration: "none" }}
                key={quiz.id}
              >
                <Box
                  sx={{
                    color: color,
                    border: border,
                    width: "30px",
                    height: "30px",
                    borderRadius: "3px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: bgColor,
                    m: 1.3,
                    p: 2.5,
                  }}
                >
                  {index + 1}
                </Box>
              </Link>
            );
          })}
      </Stack>
      <hr style={{ borderTop: "1px solid #f2f2f2" }} />
      <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
        <Stack direction="row" alignItems="center">
          <Box
            sx={{
              background: "#02E882",
              width: "20px",
              height: "20px",
              borderRadius: "3px",
              mr: 1,
            }}
          ></Box>
          <Typography>Submitted</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box
            sx={{
              background: "#f2f2f2",
              width: "20px",
              height: "20px",
              borderRadius: "3px",
              mr: 1,
            }}
          ></Box>
          <Typography>Not Submitted</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default QuestionProfile;
