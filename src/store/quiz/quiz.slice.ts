import { v4 as uuidv4 } from 'uuid';
import { createSlice } from "@reduxjs/toolkit";
import { getQuizData } from "./quiz.api";

interface leftTime {
  minutes: number,
  seconds: number,
}

interface Quiz {
  quizData: string[],
  error: string | null,
  quizStarted: string | null,
  quizEnded: string | null,
  isLoading: boolean,
  hasStarted: boolean,
  isSubmitted: boolean,
  timeLeft: leftTime,
  submittedAnswers: any,
}

const initialState: Quiz = {
  quizData: [],
  error: null,
  quizStarted: "",
  quizEnded: "",
  isLoading: false,
  hasStarted: false,
  isSubmitted: false,
  timeLeft: {
    minutes: 0,
    seconds: 0
  },
  submittedAnswers: {},
};

const quizSlice = createSlice({
  name: "quizSlice",
  initialState,
  reducers: {
    startQuiz: (state, action) => {
       state.hasStarted = true;
       state.timeLeft.minutes = 30;
       state.quizStarted = new Date().toString();
    },
    finishQuiz: (state) => {
      state.isSubmitted = true;
      state.quizEnded = new Date().toString();
    },
    submitQuiz: (state, action) => {
      state.submittedAnswers[action.payload.id] = action.payload.answer; 
    },
    updateTimeLeft: (state, action) => {
      state.timeLeft = action.payload.timeLeft;
    }
  },
  extraReducers(builder) {
    builder.addCase(getQuizData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getQuizData.fulfilled, (state, action) => {
      state.isLoading = false;

      action.payload = action.payload.map((data: any) => {
        // Unique uuid set for each question
        data.id = uuidv4();

        // shuffled answers choice for every one
        const answerChoices = [data.correct_answer, ...data.incorrect_answers]
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
        data.answerChoices = answerChoices;

        return data;
      })
      state.quizData = action.payload;
    });
    
    builder.addCase(getQuizData.rejected, (state: any, action) => {
      state.isLoading = false;
      state.error = action?.error?.message || null;
    });
  },
});

export const { startQuiz, finishQuiz, submitQuiz, updateTimeLeft } = quizSlice.actions;
export default quizSlice.reducer;
