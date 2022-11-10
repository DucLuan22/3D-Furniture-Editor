import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDeleteMode: false,
  isDragMode: false,
  isDragging: false,
  isRotateMode: false,
};

export const customizeSlice = createSlice({
  name: "customize",
  initialState,
  reducers: {
    setDragMode: (state) => {
      state.isDeleteMode = false;
      state.isDragMode = true;
      state.isRotateMode = false;
    },
    setDeleteMode: (state) => {
      state.isDeleteMode = true;
      state.isDragMode = false;
      state.isRotateMode = false;
    },
    setRotateMode: (state) => {
      state.isDeleteMode = false;
      state.isDragMode = false;
      state.isRotateMode = true;
    },
    setDragging: (state, data) => {
      state.isDragging = data.payload;
    },
  },
});

export const { setDeleteMode, setDragMode, setRotateMode, setDragging } =
  customizeSlice.actions;

export default customizeSlice.reducer;
