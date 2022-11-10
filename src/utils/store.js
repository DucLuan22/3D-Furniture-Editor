import { configureStore } from "@reduxjs/toolkit";
import customizeReducer from "../slice/customizeSlice";
import modelSlice from "../slice/modelSlice";
export const store = configureStore({
  reducer: {
    customize: customizeReducer,
    models: modelSlice,
  },
});
