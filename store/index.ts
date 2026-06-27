import { configureStore, createSlice } from '@reduxjs/toolkit';

// Minimal slice to initialize the store
const appSlice = createSlice({
  name: 'app',
  initialState: { isInitialized: false },
  reducers: {
    setInitialized: (state) => { state.isInitialized = true; }
  }
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
