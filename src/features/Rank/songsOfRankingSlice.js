import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import songsAPI from "../../api/songsAPI";

const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchSongsOfRanking = createAsyncThunk(
  "/songs-ranking",
  async (payload, thunkAPI) => {
    try {
      const response = await songsAPI.getSongsOfRanking(payload);
      return response;
    } catch (error) {
      console.log("Fetch Songs has errors: ", error);
    }
  }
);
const songsOfRankingSlice = createSlice({
  name: "songs-ranking",
  initialState,
  extraReducers: {
    [fetchSongsOfRanking.pending](state, action) {
      state.isLoading = true;
      state.data = [];
      state.errors = null;
      state.message = "";
    },
    [fetchSongsOfRanking.fulfilled](state, action) {
      state.data = action.payload.songs;
      state.isLoading = false;
    },
    [fetchSongsOfRanking.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default songsOfRankingSlice.reducer;
