import { configureStore } from "@reduxjs/toolkit";
import customizeReducer from "../slice/customizeSlice";
import modelSlice from "../slice/modelSlice";
import authReducer from "../slice/authSlice";
import environmentReducer from "../slice/environmentSlice";
export const store = configureStore({
  reducer: {
    customize: customizeReducer,
    models: modelSlice,
    auth: authReducer,
    environment: environmentReducer,
  },
});
