"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMe } from "./userAPI";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  isError: false,
  user: [],
  error: null,
};

export const fetchMe = createAsyncThunk("user/fetchMe", async () => {
  const data = await getMe();

  if (data.message === "Token has expired. Please log in again.") {
    localStorage.removeItem("quickBasketToken");
  }
  console.log("getMe", data);

  return data?.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setProduct: (state, action) => {
      if (state.user?.shop) {
        state.user.shop.products = [
          action.payload,
          ...(state.user.shop.products || []),
        ];
      } else {
        state.user.shop = { products: [action.payload] };
      }
    },

    clearUser: () => initialState,
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

export const { setUser, clearUser, setUserType, setProduct } =
  userSlice.actions;

export default userSlice.reducer;
