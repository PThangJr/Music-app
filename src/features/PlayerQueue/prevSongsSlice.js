import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: [],
};
const prevSongsSlice = createSlice({
  name: "prev-songs",
  initialState,
  reducers: {
    setPrevSongs(state, action) {
      const song = action.payload;
      let newState = { ...state };
      if (!newState.data.find((item) => item._id === song._id)) {
        newState = { ...newState, data: [...newState.data, song] };
      } else {
        newState = { ...newState, data: [song] };
      }
      return newState;
    },
    choosePrevSong(state, action) {
      let newState = { ...state };
      newState.data.pop();
    },
    removePrevSongs(state, action) {
      state.data = [];
    },
  },
});
export default prevSongsSlice.reducer;
export const { setPrevSongs, choosePrevSong, removePrevSongs } =
  prevSongsSlice.actions;
