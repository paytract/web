import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isSidebarOpen: boolean;
}

const initialState: AppState = {
  isSidebarOpen: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen } = appSlice.actions;
export default appSlice.reducer;
