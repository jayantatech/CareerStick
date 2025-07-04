import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TemplateType =
  | "default"
  | "template1"
  | "template2"
  | "template3"
  | "template4"
  | "template5";
// | "template6";
// | "template5";

interface TemplateState {
  currentTemplate: TemplateType;
}

const initialState: TemplateState = {
  currentTemplate: "template3",
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setCurrentTemplate: (state, action: PayloadAction<TemplateType>) => {
      state.currentTemplate = action.payload;
    },
  },
});

export const { setCurrentTemplate } = templateSlice.actions;

export default templateSlice.reducer;
