import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import searchAPI from "../../../../api/searchAPI";

const initialState = {
  isLoding: false,
  data: {
    songs: [],
    singers: [],
    albums: [],
  },
  isSuccess: false,
};
export const fetchSearch = createAsyncThunk(
  "/search",
  async (payload, thunkAPI) => {
    try {
      const response = await searchAPI.search(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSearch.pending](state, action) {},
    [fetchSearch.fulfilled](state, action) {
      state.data = action.payload.search;
      state.isSuccess = true;
    },
    [fetchSearch.pending](state, action) {
      state.isSuccess = false;
    },
  },
});
export default searchSlice.reducer;
