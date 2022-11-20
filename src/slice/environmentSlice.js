import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomSize: {
    x: 5,
    y: 5,
  },
};

const environmentSlice = createSlice({
  name: "environment",
  initialState,
  reducers: {
    setRoomCoordinate: (state, data) => {
      state.roomSize = { ...data.payload };
    },
  },
});

export const { setRoomCoordinate } = environmentSlice.actions;

export default environmentSlice.reducer;
