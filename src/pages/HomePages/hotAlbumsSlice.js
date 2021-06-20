import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import albumsAPI from "../../api/albumsAPI";

const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchHotAlbums = createAsyncThunk(
  "/hot-albums",
  async (payload, thunkAPI) => {
    try {
      const response = albumsAPI.getAlbums(payload);
      return response;
    } catch (error) {
      console.log("Fetch Albums has errors: ", error);
    }
  }
);
const hotAlbumsSlice = createSlice({
  name: "hot-albums",
  initialState,
  extraReducers: {
    [fetchHotAlbums.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchHotAlbums.fulfilled](state, action) {
      state.data = action.payload.albums;
      state.isLoading = false;
    },
    [fetchHotAlbums.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default hotAlbumsSlice.reducer;
