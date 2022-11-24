import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  models: [],
  loadedDesign: {},
  saveFileList: [],
  isLoaded: false,
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setModel: (state, data) => {
      state.models = data.payload;
    },
    addModel: (state, data) => {
      state.models.push(data.payload);
    },
    saveDesign: (state, data) => {
      state.loadedDesign = data.payload;
      state.isLoaded = true;
    },
    removeModel: (state, data) => {
      state.models = state.models.filter((model) => model.id !== data.payload);
    },
    unLoadSaveFile: (state, data) => {
      state.isLoaded = false;
      state.loadedDesign = {};
    },
    updateModelPosAndRot: (state, data) => {
      const index = state.models.findIndex(
        (model) => model.id === data.payload.id
      );
      state.models[index] = {
        ...state.models[index],
        ...data.payload,
      };
    },
    setSaveFile: (state, data) => {
      state.saveFileList = data.payload;
    },
    addSaveFile: (state, data) => {
      state.saveFileList.push(data.payload);
    },
    updateSaveFile: (state, data) => {
      const index = state.saveFileList.findIndex(
        (save) => save.id === data.payload.id
      );
      state.saveFileList[index] = {
        ...state.saveFileList[index],
        ...data.payload,
      };
    },
    removeSaveFile: (state, data) => {
      state.saveFileList = state.saveFileList.filter(
        (save) => save.id !== data.payload.id
      );
    },
    resetModel: (state) => {
      state.isLoaded = false;
      state.loadedDesign = {};
      state.models = [];
    },
  },
});

export const {
  addModel,
  removeModel,
  updateModelPosAndRot,
  saveDesign,
  setSaveFile,
  addSaveFile,
  updateSaveFile,
  setModel,
  removeSaveFile,
  unLoadSaveFile,
  resetModel,
} = modelSlice.actions;

export default modelSlice.reducer;
