import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  playerQueue: false,
};
const displayFormSlice = createSlice({
  name: "display-form",
  initialState,
  reducers: {
    setDisplayPlayerQueue(state, action) {
      const newState = current(state);
      state.playerQueue = !newState.playerQueue;
    },
  },
});
export default displayFormSlice.reducer;
export const { setDisplayPlayerQueue } = displayFormSlice.actions;
