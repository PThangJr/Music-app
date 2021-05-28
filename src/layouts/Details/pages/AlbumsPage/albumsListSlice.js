import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import albumsAPI from "../../../../api/albumsAPI";

const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchAlbumsList = createAsyncThunk(
  "/list-albums",
  async (payload, thunkAPI) => {
    try {
      const response = albumsAPI.getAlbums(payload);
      return response;
    } catch (error) {
      console.log("Fetch Albums has errors: ", error);
    }
  }
);
const albumsListSlice = createSlice({
  name: "list-albums",
  initialState,
  extraReducers: {
    [fetchAlbumsList.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchAlbumsList.fulfilled](state, action) {
      state.data = action.payload.albums;
      state.isLoading = false;
    },
    [fetchAlbumsList.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default albumsListSlice.reducer;
