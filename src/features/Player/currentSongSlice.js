import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  _id: "",
  name: "",
  slug: "",
  singers: [],
  authors: [],
  linkImage: "",
  singerTxt: "",
  lyric: "",
  linkMp3: "",
  time: "",
  createdAt: "",
  updatedAt: "",
};
const currentSongSlice = createSlice({
  name: "current-song",
  initialState,
  reducers: {
    setCurrentSong(state, action) {
      const newState = { ...state, ...action.payload };
      return newState;
    },
    removeCurrerntSong(state, action) {
      const newState = { ...initialState };
      return newState;
    },
  },
});
export default currentSongSlice.reducer;
export const { setCurrentSong, removeCurrerntSong } = currentSongSlice.actions;
