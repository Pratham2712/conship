import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";

const rootReducer = combineReducers({
  authSlice: authSlice,
});

export const store = configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});

export default store;
