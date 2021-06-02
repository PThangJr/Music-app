import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import playlistsAPI from "../../api/playlistsAPI";

const initialState = {
  data: {},
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchPlaylistDetail = createAsyncThunk(
  "/playlist-detail",
  async (payload, thunkAPI) => {
    try {
      const response = playlistsAPI.getPlaylistBySlug(payload);
      return response;
    } catch (error) {
      console.log("Fetch playlist detail has errors: ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const playlists = createSlice({
  name: "playlist-detail",
  initialState,
  extraReducers: {
    [fetchPlaylistDetail.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchPlaylistDetail.fulfilled](state, action) {
      state.data = action.payload.playlists;
      state.isLoading = false;
    },
    [fetchPlaylistDetail.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default playlists.reducer;
