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
import AsyncStorage from "@react-native-async-storage/async-storage";

axios.defaults.withCredentials = true;

export const checkUsernameThunk = createAsyncThunk(
  "/auth/checkUser",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/checkUser`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const registerThunk = createAsyncThunk("auth/register", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const loginThunk = createAsyncThunk("auth/login", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, data);
    if (res) {
      console.log(res);

      await AsyncStorage.setItem("token", res.token);
      await AsyncStorage.setItem("username", res.data.data[0].username);
    }
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const checkUserLoginThunk = createAsyncThunk(
  "/auth/token_login",
  async () => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/token_login`, data);
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
  successData: {
    message: "",
  },
  isError: false,
  isLogin: false,
  data: {
    userInfo: [],
    userExist: false,
  },
  token: null,
  status: {
    registerThunk: IDLE,
    checkUsernameThunk: IDLE,
    checkUserLoginThunk: IDLE,
  },
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
    logout: (state) => {
      state.token = null;
      AsyncStorage.removeItem("token");
    },
    clearSuccessMsg: (state) => {
      state.successData.message = "";
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(checkUsernameThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(checkUsernameThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case FAILURE:
            state.data.userExist = payload.data;
            state.loading = false;
            state.status.checkUsernameThunk = FULFILLED;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
          case SUCCESS:
            state.data.userExist = payload.data;
            state.loading = false;
            state.status.checkUsernameThunk = FULFILLED;
          default:
            //state.isError = true;
            state.loading = false;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      //registerThunk==============================================================================================================
      .addCase(registerThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            console.log(payload);
            state.data.userInfo = payload.data[0];
            state.loading = false;
            state.isLogin = true;
            state.status.registerThunk = FULFILLED;
            break;
          default:
            state.isLogin = false;
            state.loading = false;
            state.isError = true;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status.registerThunk = ERROR;
        state.loading = false;
        state.errorData = action.error.message;
      })
      //loginThunk===============================================================================================
      .addCase(loginThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.userInfo = payload.data[0];
            state.loading = false;
            state.isLogin = true;
            state.token = payload.token;
            state.status.loginThunk = FULFILLED;
            break;
          default:
            state.isLogin = false;
            state.loading = false;
            state.isError = true;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status.loginThunk = ERROR;
        state.loading = false;
        state.errorData = action.error.message;
      })
      //checkUserLoginThunk===============================================================================================
      .addCase(checkUserLoginThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(checkUserLoginThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.userInfo = payload.data;

            state.loading = false;
            state.isLogin = true;
            state.updateDone = !state.updateDone;
            state.status.checkUserLoginThunk = FULFILLED;
            break;
          default:
            state.isLogin = false;
            state.loading = false;
            state.errorData = {
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(checkUserLoginThunk.rejected, (state, action) => {
        state.status.checkUserLoginThunk = ERROR;
        state.loading = false;
        state.errorData = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const { clearErrorSlice, changeUserExist, clearSuccessMsg } =
  authSlice.actions;
