import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import singersAPI from "../../api/singersAPI";
const initialState = {
  isLoading: false,
  data: [],
  errors: null,
  message: "",
};
export const fetchSingers = createAsyncThunk(
  "/singers",
  async (payload, thunkAPI) => {
    try {
      const response = await singersAPI.getSingers(payload);
      return response;
    } catch (error) {
      console.log("Fetch singers has errors: ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchCreateSinger = createAsyncThunk(
  "/create-singer",
  async (payload, thunkAPI) => {
    try {
      const response = await singersAPI.createSinger(payload);
      return response;
    } catch (error) {
      console.log("Fetch singers has errors: ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const singersSlice = createSlice({
  name: "singers",
  initialState,
  reducers: {
    clearMessageAndErrorSinger(state, action) {
      state.message = "";
      state.errors = null;
    },
  },
  extraReducers: {
    [fetchSingers.pending](state, action) {
      state.isLoading = true;
      // state.errors = null;
      // state.message = "";
    },
    [fetchSingers.fulfilled](state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
    [fetchSingers.rejected](state, action) {
      console.log(action.payload);
    },
    [fetchCreateSinger.pending](state, action) {
      state.isLoading = true;
      // state.errors = null;
      // state.message = "";
    },
    [fetchCreateSinger.fulfilled](state, action) {
      state.message = action.payload.message;
      state.isLoading = false;
    },
    [fetchCreateSinger.rejected](state, action) {
      state.errors = action.payload.message;
      state.isLoading = false;
    },
  },
});
export default singersSlice.reducer;
export const { clearMessageAndErrorSinger } = singersSlice.actions;
