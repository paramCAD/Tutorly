import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: {
    active: null,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.tab.active = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setActiveTab } = appSlice.actions;

export default appSlice.reducer;
