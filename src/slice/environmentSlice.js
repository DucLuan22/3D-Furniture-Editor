import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  floorTypes: [],
  wallTypes: [],
  roomSize: {
    x: 15,
    grid: 10,
  },
  lightLevel: {
    ambient: 1,
    directional: 1,
  },
  isGridHelper: false,
  floorType: null,
  wallType: null,
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
      state.floorType = null;
      state.wallType = null;
    },
    setGridHelper: (state, data) => {
      state.isGridHelper = data.payload;
    },
    setFloorType: (state, data) => {
      state.floorType = data.payload;
    },
    setWallType: (state, data) => {
      state.wallType = data.payload;
    },
  },
});

export const {
  setRoomCoordinate,
  setLightIntensity,
  setResetEnvironment,
  setGridHelper,
  setFloorType,
  setWallType,
} = environmentSlice.actions;

export default environmentSlice.reducer;
