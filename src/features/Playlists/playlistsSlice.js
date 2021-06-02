import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import playlistsAPI from "../../api/playlistsAPI";

const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchPlaylists = createAsyncThunk(
  "/playlists",
  async (payload, thunkAPI) => {
    try {
      const response = playlistsAPI.getPlaylists(payload);
      return response;
    } catch (error) {
      console.log("Fetch Playlists has errors: ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const playlists = createSlice({
  name: "playlists",
  initialState,
  extraReducers: {
    [fetchPlaylists.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchPlaylists.fulfilled](state, action) {
      state.data = action.payload.playlists;
      state.isLoading = false;
    },
    [fetchPlaylists.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default playlists.reducer;
