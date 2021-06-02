import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import albumsAPI from "../../api/albumsAPI";

const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchAlbums = createAsyncThunk(
  "/albums",
  async (payload, thunkAPI) => {
    try {
      const response = await albumsAPI.getAlbums(payload);
      return response;
    } catch (error) {
      console.log("Fetch Albums has errors: ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchAlbumsOfSinger = createAsyncThunk(
  "/albums",
  async (payload, thunkAPI) => {
    try {
      const response = albumsAPI.getAlbumsOfSinger(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  extraReducers: {
    [fetchAlbums.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchAlbums.fulfilled](state, action) {
      state.data = action.payload.albums;
      state.isLoading = false;
    },
    [fetchAlbums.rejected](state, action) {
      console.log(action.payload);
    },
    [fetchAlbumsOfSinger.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchAlbumsOfSinger.fulfilled](state, action) {
      state.data = action.payload.albums;
      state.isLoading = false;
    },
    [fetchAlbumsOfSinger.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default albumsSlice.reducer;
