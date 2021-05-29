import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import albumsAPI from "../../api/albumsAPI";

const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchAnthologyAlbums = createAsyncThunk(
  "/anthology-albums",
  async (payload, thunkAPI) => {
    try {
      const response = albumsAPI.getAlbums(payload);
      return response;
    } catch (error) {
      console.log("Fetch Albums has errors: ", error);
    }
  }
);
const anthologyAlbumsSlice = createSlice({
  name: "anthology-albums",
  initialState,
  extraReducers: {
    [fetchAnthologyAlbums.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchAnthologyAlbums.fulfilled](state, action) {
      state.data = action.payload.albums;
      state.isLoading = false;
    },
    [fetchAnthologyAlbums.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default anthologyAlbumsSlice.reducer;
