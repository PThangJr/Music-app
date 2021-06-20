import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import songsAPI from "../../api/songsAPI";

const initialState = {
  data: JSON.parse(localStorage.getItem("songsPlay")) || [],
  isLoading: false,
  message: "",
  errors: null,
};
const setLocaleStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};
const removeLocaleStorage = (name) => {
  localStorage.removeItem(name);
};
export const fetchSongsPlayOfAlbum = createAsyncThunk(
  "/songs-play-of-album",
  async (payload, thunkAPI) => {
    try {
      const response = await songsAPI.getSongsOfAlbum(payload);

      // return { ...response, songs: response.songs.slice(1) };
      setLocaleStorage("songsPlay", response.songs);
      return response.songs;
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
        setLocaleStorage("songsPlay", [...currentSong, ...randomSongs]);
      }
    },
    setSongsPlay(state, action) {
      state.data = action.payload;
      setLocaleStorage("songsPlay", action.payload);
    },
    updateSongList(state, action) {
      setLocaleStorage("songsPlay", action.payload);
      state.data = action.payload;
    },
    setNextSongs(state, action) {
      const newData = [...current(state).data];
      newData.unshift();
      state.data.unshift(action.payload);
      setLocaleStorage("songsPlay", newData);
    },
    removeNextSong(state, action) {
      const newData = [...current(state).data];
      newData.shift();
      state.data.shift();
      setLocaleStorage("songsPlay", newData);
    },
    removeNextSongs(state, action) {
      state.data = [];
      removeLocaleStorage("songsPlay");
    },
  },

  extraReducers: {
    [fetchSongsPlayOfAlbum.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchSongsPlayOfAlbum.fulfilled](state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
    [fetchSongsPlayOfAlbum.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default songsPlaySlice.reducer;
export const {
  randomSongs,
  updateSongList,
  setNextSongs,
  removeNextSong,
  removeNextSongs,
  setSongsPlay,
} = songsPlaySlice.actions;
