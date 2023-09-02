import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Radio,
  Stack,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

const Report = () => {
  const [quizData, submittedAnswers] = useSelector(
    (state: any) => [
      state?.quiz.quizData,
      state?.quiz.submittedAnswers,
      state?.quiz.isSubmitted,
    ],
    shallowEqual
  );
  return (
    <Box
      sx={{
        height: "calc(100vh - 58px)",
        overflow: "auto",
        marginTop: "0px",
        border: "1px solid red",
      }}
    >
      {quizData &&
        quizData.map((quiz: any, index: number) => {
          let yourAnswer = submittedAnswers[index]
            ? submittedAnswers[index].value
            : "";
          return (
            <Box sx={{ background: "#fff", m: 3, px: 3, py: 2 }}>
              <h3 style={{ fontWeight: 400 }}>
                <span style={{ fontWeight: 600 }}>Quiz: </span>
                {quiz.question || ""}
              </h3>
              <hr style={{ borderTop: "1px solid #f2f2f2" }} />
              <FormControl sx={{mb: 2}}>
                <FormLabel id="label">Answers:</FormLabel>
                <RadioGroup
                  aria-labelledby="label"
                  value={yourAnswer}
                  name="radio-answer"
                >
                  {quiz.answerChoices.map((answer: any, index: number) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={answer}
                        control={<Radio />}
                        label={answer}
                        disabled
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              {yourAnswer === quiz.correct_answer ? (
                 <>
                 <Typography sx={{ color: "#02E882" }}>Correct</Typography>
                 {/* <span>currect ans is <b>{quiz.correct_answer}</b></span> */}
                 </>
              ) : (
                <>
                <Typography sx={{ color: "#FF3366" }}>Incorrect: </Typography><span>currect ans is <b>{quiz.correct_answer}</b></span>
                </>
              )}
            </Box>
          );
        })}
    </Box>
  );
};

export default Report;
