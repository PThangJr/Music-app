import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorsAPI from "../../api/authorsAPI";
const initialState = {
  isLoading: false,
  data: [],
  errors: null,
  message: "",
};
export const fetchAuthors = createAsyncThunk(
  "/authors",
  async (payload, thunkAPI) => {
    try {
      const response = await authorsAPI.getAuthors(payload);
      return response;
    } catch (error) {
      console.log("Fetch authors has errors: ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const singersSlice = createSlice({
  name: "authors",
  initialState,
  extraReducers: {
    [fetchAuthors.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchAuthors.fulfilled](state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
    [fetchAuthors.rejected](state, action) {
      console.log(action.payload);
    },
  },
});
export default singersSlice.reducer;
