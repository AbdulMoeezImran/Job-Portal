import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { appliedJobReducer, fetchUser, jobReducer, userReducer } from "./slice";

const logger = createLogger();

const rootReducer = combineReducers({
  userReducer,
  jobReducer,
  appliedJobReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([logger]),
});

store.dispatch(fetchUser());
