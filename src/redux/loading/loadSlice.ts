import { createSlice } from '@reduxjs/toolkit';

interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false, // Initially, no global loading
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true; // Set loading to true when loading starts
    },
    stopLoading(state) {
      state.loading = false; // Set loading to false when loading stops
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
