import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import songsAPI from "../../api/songsAPI";

const initialState = {
  data: JSON.parse(localStorage.getItem("songsOfAlbum")) || [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchSongsOfSinger = createAsyncThunk(
  "/songs-of-singer",
  async (payload, thunkAPI) => {
    try {
      const response = songsAPI.getSongsOfSinger(payload);
      return response;
    } catch (error) {
      console.log("Fetch Songs has errors: ", error);
    }
  }
);

const songsOfSingerSlice = createSlice({
  name: "songs-of-singer",
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
    [fetchSongsOfSinger.pending](state, action) {
      state.isLoading = true;
      state.data = [];
      state.errors = null;
      state.message = "";
    },
    [fetchSongsOfSinger.fulfilled](state, action) {
      state.data = action.payload.songs;
      localStorage.setItem(
        "songsOfAlbum",
        JSON.stringify(action.payload.songs)
      );
      state.isLoading = false;
    },
    [fetchSongsOfSinger.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default songsOfSingerSlice.reducer;
