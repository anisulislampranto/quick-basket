"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMe } from "./userAPI";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  isError: false,
  user: [],
  error: null,
  userType: "customer",
};

export const fetchMe = createAsyncThunk("user/fetchMe", async () => {
  const data = await getMe();

  return data?.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: () => {
      return null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { setUser, clearUser, setUserType } = userSlice.actions;

export default userSlice.reducer;
