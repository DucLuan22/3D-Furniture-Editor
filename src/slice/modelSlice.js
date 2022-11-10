import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  models: [],
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    addModel: (state, data) => {
      state.models.push(data.payload);
    },
    removeModel: (state, data) => {
      state.models = state.models.filter((model) => model.id !== data.payload);
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
  },
});

export const { addModel, removeModel, updateModelPosAndRot } =
  modelSlice.actions;

export default modelSlice.reducer;
