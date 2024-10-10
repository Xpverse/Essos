import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import { Tuple } from "@reduxjs/toolkit"
import { thunkReducer } from './materialRequestReducer';

const customMiddleware = [ thunk, logger];

const store = configureStore({
  reducer: {
    materialRequestReducer : thunkReducer
  },
  middleware: () => new Tuple(logger,thunk),
});

export default store;