import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import authsAPI from "../../api/authsAPI";

const initialState = {
  isLoading: false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  message: "",
  errors: null,
  authenticate: localStorage.getItem("accessToken") ? true : false,
  isAdmin: JSON.parse(localStorage.getItem("user"))?.role === "admin" || false,
};
export const fetchLogin = createAsyncThunk(
  "/login",
  async (payload, thunkAPI) => {
    try {
      const response = await authsAPI.login(payload);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response;
    } catch (error) {
      console.log("Fetch login has Error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// export const fetchRegister = createAsyncThunk("/register", async (payload) => {
//   try {
//     const response = await authsAPI.login(payload);
//     localStorage.setItem("accessToken", response.accessToken);
//     return response;
//   } catch (error) {
//     console.log("Fetch login has Error", error);
//   }
// });
const authsSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    isAdminLogin(state, action) {
      const isAdmin =
        JSON.parse(localStorage.getItem("user"))?.role === "admin";
      if (isAdmin) {
        state.isAdmin = isAdmin;
      }
    },
    logout(state, action) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      state.authenticate = false;
      state.isAdmin = false;
    },
    clearMessageAndErrorsAuths(state) {
      state.message = "";
      state.errors = null;
    },
  },
  extraReducers: {
    [fetchLogin.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchLogin.fulfilled](state, action) {
      state.isLoading = false;
      state.message = action.payload.message;
      state.authenticate = true;
      state.user = action.payload.user;
    },
    [fetchLogin.rejected](state, action) {
      state.isLoading = false;
      state.authenticate = false;
      state.errors = action.payload.data.errors;
    },
  },
});
export default authsSlice.reducer;
export const {
  checkAdminLogin,
  isAdminLogin,
  logout,
  clearMessageAndErrorsAuths,
} = authsSlice.actions;
