import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

const reducer = {
  auth: authSlice,
};

export const store = configureStore({
  reducer,
});
