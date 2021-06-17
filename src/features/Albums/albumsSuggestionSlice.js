import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import albumsAPI from "../../api/albumsAPI";

const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchAlbumsSuggestion = createAsyncThunk(
  "/albums-suggestion",
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

const albumsSuggestionSlice = createSlice({
  name: "albums-suggestion",
  initialState,
  extraReducers: {
    [fetchAlbumsSuggestion.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchAlbumsSuggestion.fulfilled](state, action) {
      state.data = action.payload.albums;
      state.isLoading = false;
    },
    [fetchAlbumsSuggestion.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default albumsSuggestionSlice.reducer;
