import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
  userData: {},
};
const AuthSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.userData = {};
    },
    setUserdata: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { login, logout, setUserData } = AuthSlice.actions;
export default AuthSlice.reducer;
