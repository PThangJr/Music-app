import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerQueue: false,
};
const displayFormSlice = createSlice({
  name: "display-form",
  initialState,
  reducers: {
    setDisplayPlayerQueue(state, action) {
      state.playerQueue = action.payload.playerQueue;
    },
  },
});
export default displayFormSlice.reducer;
export const { setDisplayPlayerQueue } = displayFormSlice.actions;
