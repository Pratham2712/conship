import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  ERROR,
  FAILURE,
  FULFILLED,
  IDLE,
  SUCCESS,
} from "../(constant)/constants";

axios.defaults.withCredentials = true;

export const getOrdersThunk = createAsyncThunk(
  "/main/getorder",
  async (data) => {
    try {
      const res = await axios.get(`${BASE_URL}/main/getorder`);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const initialState = {
  loading: false,
  updateDone: false,
  errorData: {
    message: "",
    type: "",
    errors: [],
  },
  data: {
    order: [],
  },
  status: {
    getOrdersThunk: IDLE,
  },
};

const mainSlice = createSlice({
  name: "mainSlice",
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.errorData = {};
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getOrdersThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getOrdersThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.order = payload.data;
            state.loading = false;
            state.status.getOrdersThunk = FULFILLED;
            break;
          default:
            state.loading = false;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.status.getOrdersThunk = ERROR;
        state.loading = false;
        state.errorData = action.error.message;
      });
  },
});

export default mainSlice.reducer;
export const { clearErrorSlice } = mainSlice.actions;
