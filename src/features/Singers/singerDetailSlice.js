import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import singersAPI from "../../api/singersAPI";

const initialState = {
  isLoading: false,
  data: {},
  message: "",
};
export const fetchSingerDetail = createAsyncThunk(
  "/singer/:singerSlug",
  async (payload, thunkAPI) => {
    try {
      const response = await singersAPI.getSingerDetail(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const singerDetailSlice = createSlice({
  name: "singer-detail",
  initialState,
  extraReducers: {
    [fetchSingerDetail.pending](state, action) {
      state.isLoading = true;
      state.data = {};
    },
    [fetchSingerDetail.fulfilled](state, action) {
      state.isLoading = false;
      state.data = action.payload.singer;
    },
    [fetchSingerDetail.pending](state, action) {
      state.isLoading = false;
      state.data = {};
    },
  },
});
export default singerDetailSlice.reducer;
