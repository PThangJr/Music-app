import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import songsAPI from "../../api/songsAPI";

const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchSongsPlayOfAlbum = createAsyncThunk(
  "/songs-play-of-album",
  async (payload, thunkAPI) => {
    try {
      const response = songsAPI.getSongsOfAlbum(payload);
      return response;
    } catch (error) {
      console.log("Fetch Songs has errors: ", error);
    }
  }
);

const songsPlaySlice = createSlice({
  name: "songs-play",
  initialState,
  reducers: {
    randomSongs(state, action) {
      const { isRandom, songId } = action.payload;

      let currentData = [...current(state).data];
      const othersSong = currentData.filter((item) => item._id !== songId);
      const currentSong = currentData.filter((item) => item._id === songId);
      if (isRandom) {
        let randomSongs = othersSong.sort(() => Math.random() - 0.5);
        state.data = [...currentSong, ...randomSongs];
      }
    },
    updateSongList(state, action) {
      state.data = action.payload;
    },
  },

  extraReducers: {
    [fetchSongsPlayOfAlbum.pending](state, action) {
      state.isLoading = true;
      state.data = [];
      state.errors = null;
      state.message = "";
    },
    [fetchSongsPlayOfAlbum.fulfilled](state, action) {
      state.data = action.payload.songs;

      state.isLoading = false;
    },
    [fetchSongsPlayOfAlbum.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default songsPlaySlice.reducer;
export const { randomSongs, updateSongList } = songsPlaySlice.actions;
