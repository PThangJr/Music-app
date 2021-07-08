import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import songsAPI from "../../api/songsAPI";

const initialState = {
  data: [],
  isLoading: false,
  isLoadingMore: false,
  message: "",
  errors: null,
  pagination: {
    page: 1,
  },
};
export const fetchSongsOfRanking = createAsyncThunk(
  "/songs-ranking",
  async (payload, thunkAPI) => {
    try {
      const response = await songsAPI.getSongsOfRanking(payload);
      return response;
    } catch (error) {
      console.log("Fetch Songs has errors: ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchLoadMoreSongsOfRanking = createAsyncThunk(
  "/songs-ranking/more",
  async (payload, thunkAPI) => {
    try {
      const response = await songsAPI.getSongsOfRanking(payload);
      return response;
    } catch (error) {
      console.log("Fetch Songs has errors: ", error);
      return thunkAPI.rejectWithValue(error);
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
      state.pagination = action.payload.pagination;
      state.isLoading = false;
    },
    [fetchSongsOfRanking.rejected](state, action) {
      console.log(action.payload);
    },
    [fetchLoadMoreSongsOfRanking.pending](state, action) {
      state.errors = null;
      state.message = "";
      state.isLoadingMore = true;
    },
    [fetchLoadMoreSongsOfRanking.fulfilled](state, action) {
      state.data = [...state.data, ...action.payload.songs];
      state.pagination = action.payload.pagination;
      state.isLoadingMore = false;
    },
    [fetchLoadMoreSongsOfRanking.rejected](state, action) {
      console.log(action.payload);
      state.isLoadingMore = false;
      state.isLoading = false;
    },
  },
});

export default songsOfRankingSlice.reducer;
