import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoriesAPI from "../../api/categoriesAPI";
import singersAPI from "../../api/singersAPI";
const initialState = {
  isLoading: false,
  data: [],
  errors: null,
  message: "",
};
export const fetchCategories = createAsyncThunk(
  "/categories",
  async (payload, thunkAPI) => {
    try {
      const response = await categoriesAPI.getCategories(payload);
      return response;
    } catch (error) {
      console.log("Fetch categories has errors: ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: {
    [fetchCategories.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchCategories.fulfilled](state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
    [fetchCategories.rejected](state, action) {
      console.log(action.payload);
    },
  },
});
export default categoriesSlice.reducer;
