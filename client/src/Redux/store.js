import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { appliedJobReducer, jobReducer, userReducer } from "./slice";

const logger = createLogger();

const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobReducer,
  appliedJobs: appliedJobReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([logger]),
});
