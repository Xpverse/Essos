import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import { Tuple } from "@reduxjs/toolkit"
import { thunkReducer } from './reducers/materialRequestReducer';
import { wellReducer } from './reducers/wellReducer';

const customMiddleware = [ thunk, logger];

const store = configureStore({
  reducer: {
    materialRequestReducer : thunkReducer,
    wellReducer: wellReducer
  },
  middleware: () => new Tuple(logger,thunk),
});

export default store;