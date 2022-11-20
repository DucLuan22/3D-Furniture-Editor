import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDeleteMode: false,
  isDragMode: true,
  isDragging: false,
  isRotateMode: false,
  isLiftMode: false,
};

export const customizeSlice = createSlice({
  name: "customize",
  initialState,
  reducers: {
    setDragMode: (state) => {
      state.isDeleteMode = false;
      state.isDragMode = true;
      state.isRotateMode = false;
      state.isLiftMode = false;
    },
    setDeleteMode: (state) => {
      state.isDeleteMode = true;
      state.isDragMode = false;
      state.isRotateMode = false;
      state.isLiftMode = false;
    },
    setRotateMode: (state) => {
      state.isDeleteMode = false;
      state.isDragMode = false;
      state.isRotateMode = true;
      state.isLiftMode = false;
    },
    setDragging: (state, data) => {
      state.isDragging = data.payload;
    },
    setLiftMode: (state, data) => {
      state.isDeleteMode = false;
      state.isDragMode = false;
      state.isRotateMode = false;
      state.isLiftMode = true;
    },
  },
});

export const {
  setDeleteMode,
  setDragMode,
  setRotateMode,
  setDragging,
  setLiftMode,
} = customizeSlice.actions;

export default customizeSlice.reducer;
