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
  isGridHelper: false,
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
    setResetEnvironment: (state, data) => {
      state.roomSize = {
        x: 15,
        grid: 10,
      };
      state.lightLevel = {
        ambient: 1,
        directional: 1,
      };
    },
    setGridHelper: (state, data) => {
      state.isGridHelper = data.payload;
    },
  },
});

export const {
  setRoomCoordinate,
  setLightIntensity,
  setResetEnvironment,
  setGridHelper,
} = environmentSlice.actions;

export default environmentSlice.reducer;
