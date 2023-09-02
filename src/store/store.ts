import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import sessionReducer from "./session/session.slice";
import quizReducer from './quiz/quiz.slice';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ 
  session: sessionReducer,
  quiz: quizReducer
}) 

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store =  configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)