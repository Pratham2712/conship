import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import mainSlice from "./mainSlice.js";

const rootReducer = combineReducers({
  authSlice: authSlice,
  mainSlice: mainSlice,
});

export const store = configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});

export default store;
