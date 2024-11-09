import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import { Tuple } from "@reduxjs/toolkit"
import { thunkReducer } from './reducers/materialRequestReducer';
import { wellReducer } from './reducers/wellReducer';
import { rigReducer } from './reducers/rigReducer';
import { vesselReducer } from './reducers/vesselReducer';
import { supplierReducer } from './reducers/supplierReducer';
import { rigWellMapReducer } from './reducers/rigwellmapReducer';
import { vesselJourneyReducer } from './reducers/vesselJourneyReducer';

const customMiddleware = [ thunk, logger];

const store = configureStore({
  reducer: {
    materialRequestReducer : thunkReducer,
    wellReducer: wellReducer,
    rigReducer: rigReducer,
    vesselReducer: vesselReducer,
    supplierReducer:supplierReducer,
    rigWellMapReducer:rigWellMapReducer,
    vesselJourneyReducer:vesselJourneyReducer
   
  },
  middleware: () => new Tuple(logger,thunk),
});

export default store;