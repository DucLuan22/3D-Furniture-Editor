import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: "",
  isLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedUser: (state, data) => {
      state.loggedUser = data.payload;
      state.isLogin = true;
    },
    reset: (state) => {
      state.loggedUser = {};
      state.isLogin = false;
    },
  },
});

export const { setLoggedUser, reset } = authSlice.actions;

export default authSlice.reducer;
