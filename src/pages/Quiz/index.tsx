import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
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
} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { submitQuiz, finishQuiz } from "../../store/quiz/";
import QuestionProfile from "../../components/Questionsprofile";

const Quiz = () => {
  const { id } = useParams();
  const currentQuestion = +(id || 0);
  let currentAnswer = '';
  const dispatch = useDispatch<any>();
  const [quizData, submittedAnswers, isSubmitted] = useSelector(
    (state: any) => [state?.quiz.quizData, state?.quiz.submittedAnswers, state?.quiz.isSubmitted],
    shallowEqual
  );
  const questionDetail = (id && quizData[id]) || {};
  const { question, answerChoices = [] } = questionDetail;

  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");

  if (id && quizData && quizData.length - 1 < parseInt(id)) {
    console.log("No data exist");
    return <Navigate to="/404" replace={true} />;
  }

  if (id && submittedAnswers && submittedAnswers[id]){
    currentAnswer = submittedAnswers[id].value;
  }

  // console.log('questionDetail: ', questionDetail, quizData.length);
  // console.log('answerChoices: ', answerChoices);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value) {
      console.log("value: ", value);
      setError(false);
      setHelperText(" ");

      dispatch(
        submitQuiz({ id, answer: { value: value, uuid: questionDetail.id } })
      );
    } else {
      setError(true);
      setHelperText("Please select an option.");
    }
  };

  const handleFinish = () => {
    dispatch(finishQuiz());
  }

  return (
    <Box>
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
          sx={{
            height: "calc(100vh - 58px)",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
            sx={{ mb: 2, px: 3 }}
          >
            <Box sx={{ width: '120px' }}>
              {id && +id > 0 && (
                <Link to={`/quiz/${+id - 1}`}>
                  <Button
                    sx={{ mt: 1, mr: 1 }}
                    type="button"
                    variant="contained"
                  >
                    <ArrowBackIosIcon sx={{ fontSize: '13px' }} />
                    Previous
                  </Button>
                </Link>
              )}
            </Box>
            <Box sx={{ 
              borderRadius: "3px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: '#fff',
              px: 2,
              py: 1
            }}><b>Question</b> &nbsp;&nbsp;<span style={{ color: '#4C84FF' }}>{currentQuestion + 1}</span>&nbsp; of &nbsp;<span style={{ color: '#4C84FF' }}>{quizData && quizData.length}</span></Box>
            <Box>
              {id && +id < quizData.length - 1 && (
                <Link to={`/quiz/${+id + 1}`}>
                  <Button
                    sx={{ mt: 1, mr: 1 }}
                    type="button"
                    variant="contained"
                  >
                    Next
                    <ArrowForwardIosIcon sx={{ fontSize: '13px', ml: .5 }} />
                  </Button>
                </Link>
              )}
            </Box>
          </Stack>

          <Box sx={{ background: "#fff", mx: 3, px: 3, py: 2, flex: 1 }}>
            <h3 style={{ fontWeight: 400 }}>
              <span style={{ fontWeight: 600 }}>Quiz: </span>
              {question || ""}
            </h3>
            <hr style={{ borderTop: "1px solid #f2f2f2" }} />

            <form onSubmit={handleSubmit}>
              <FormControl error={error}>
                <FormLabel id="label">Answers:</FormLabel>
                <RadioGroup
                  aria-labelledby="label"
                  value={value || currentAnswer}
                  onChange={handleRadioChange}
                  name="radio-answer"
                >
                  {answerChoices.map((answer: any, index: number) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={answer}
                        control={<Radio />}
                        label={answer}
                      />
                    );
                  })}
                </RadioGroup>

                <FormHelperText>{helperText}</FormHelperText>
              </FormControl>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" flexWrap="wrap" gap={2}>
                  <Button
                    sx={{ mt: 1, mr: 1, color: '#fff' }}
                    type="submit"
                    color="success"
                    variant="contained"
                  >
                    Submit Answer
                  </Button>

                  <Button
                    sx={{ mt: 1, mr: 1 }}
                    type="button"
                    color="secondary"
                    onClick={() => setValue("")}
                    variant="contained"
                  >
                    Reset Answer
                  </Button>
                </Stack>

                <Stack direction="row">
                <Button
                    sx={{ mt: 1, mr: 1, color: '#fff' }}
                    type="submit"
                    color="error"
                    variant="contained"
                    onClick={handleFinish}
                  >
                    Finish Now
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
          sx={{ height: "calc(100vh - 58px)", overflow: "auto", p: 2 }}
        >
          <QuestionProfile
            quizData={quizData}
            submittedAnswers={submittedAnswers}
            currentQuestion={currentQuestion}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Quiz;
