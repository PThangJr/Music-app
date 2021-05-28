import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  indexCurrentSong: 0,
  indexPreviousSong: 0,
  indexNextSong: 0,
};
const indexSongSlice = createSlice({
  name: "index-song",
  initialState,
  reducers: {
    setIndexSong(state, action) {
      const newState = {
        ...state,
        ...action.payload,
      };
      localStorage.setItem("indexSong", JSON.stringify(action.payload));
      return newState;
    },
    nextSong(state, action) {
      const newState = {
        ...state,
        ...action.payload,
      };
      localStorage.setItem("indexSong", JSON.stringify(action.payload));
      return newState;
    },
  },
});
export default indexSongSlice.reducer;
export const { setIndexSong, nextSong } = indexSongSlice.actions;
