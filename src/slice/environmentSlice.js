import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomSize: {
    x: 15,
    grid: 10,
  },
  lightLevel: {
    ambient: 1,
    directional: 1,
  },
};

const environmentSlice = createSlice({
  name: "environment",
  initialState,
  reducers: {
    setRoomCoordinate: (state, data) => {
      state.roomSize = data.payload;
    },
    setLightIntensity: (state, data) => {
      state.lightLevel = data.payload;
    },
  },
});

export const { setRoomCoordinate, setLightIntensity } =
  environmentSlice.actions;

export default environmentSlice.reducer;
