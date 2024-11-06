"use client";

const { createSlice } = require("@reduxjs/toolkit");

const usersSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: () => {
      return null;
    },
  },
});

export const { setUser, clearUser } = usersSlice.actions;

export default usersSlice.reducer;
