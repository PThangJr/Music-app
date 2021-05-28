import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  songs: [],
  message: "",
};
const currentAlbumSlice = createSlice({
  name: "current-album",
  initialState,
  reducers: {
    setCurrentAlbum(state, action) {
      const newState = {
        ...state,
        ...action.payload,
      };
      return newState;
    },
  },
});
export default currentAlbumSlice.reducer;
export const { setCurrentSong } = currentAlbumSlice.actions;
