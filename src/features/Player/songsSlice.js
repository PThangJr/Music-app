import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import songsAPI from "../../api/songsAPI";

const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchSongs = createAsyncThunk(
  "/songs",
  async (payload, thunkAPI) => {
    try {
      const response = songsAPI.getSongs(payload);
      return response;
    } catch (error) {
      console.log("Fetch Songs has errors: ", error);
    }
  }
);
const songsSlice = createSlice({
  name: "songs",
  initialState,
  extraReducers: {
    [fetchSongs.pending](state, action) {
      state.isLoading = true;
      state.data = [];
      state.errors = null;
      state.message = "";
    },
    [fetchSongs.fulfilled](state, action) {
      state.data = action.payload.songs;
      state.isLoading = false;
    },
    [fetchSongs.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default songsSlice.reducer;
