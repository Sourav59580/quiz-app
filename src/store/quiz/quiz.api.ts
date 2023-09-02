import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQuizData = createAsyncThunk("getQuizData", async () => {
  const res = await axios(`https://opentdb.com/api.php?amount=15`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.data.results;
  console.log("data: ", data);
  return data;
});
