import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import albumsAPI from "../../api/albumsAPI";

const initialState = {
  isLoading: false,
  data: [],
  message: "",
};
export const fetchAlbumsOfSinger = createAsyncThunk(
  "/albums/singer",
  async (payload, thunkAPI) => {
    try {
      const response = albumsAPI.getAlbumsOfSinger(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const albumsOfSingerSlice = createSlice({
  name: "albums-of-singer",
  initialState,
  extraReducers: {
    [fetchAlbumsOfSinger.pending](state, action) {
      state.isLoading = true;
      state.data = [];
    },
    [fetchAlbumsOfSinger.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.albums;
    },
    [fetchAlbumsOfSinger.pending](state, action) {
      state.isLoading = false;
      state.data = [];
    },
  },
});
export default albumsOfSingerSlice.reducer;
