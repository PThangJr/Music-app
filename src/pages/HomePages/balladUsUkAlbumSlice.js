import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import albumsAPI from "../../api/albumsAPI";

const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchBalladUsUkAlbums = createAsyncThunk(
  "/ballad-us-uk-albums",
  async (payload, thunkAPI) => {
    try {
      const response = albumsAPI.getAlbums(payload);
      return response;
    } catch (error) {
      console.log("Fetch Albums has errors: ", error);
    }
  }
);
const balladUsUkAlbumsSlice = createSlice({
  name: "ballad-us-uk-albums",
  initialState,
  extraReducers: {
    [fetchBalladUsUkAlbums.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchBalladUsUkAlbums.fulfilled](state, action) {
      state.data = action.payload.albums;
      state.isLoading = false;
    },
    [fetchBalladUsUkAlbums.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default balladUsUkAlbumsSlice.reducer;
