import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import albumsAPI from "../../api/albumsAPI";

const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchAlbums = createAsyncThunk(
  "/albums",
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
export const fetchAlbumsOfSinger = createAsyncThunk(
  "/albums/singer",
  async (payload, thunkAPI) => {
    try {
      const response = albumsAPI.getAlbumsOfSinger(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchCreateAlbum = createAsyncThunk(
  "/album/create",
  async (payload, thunkAPI) => {
    try {
      const response = await albumsAPI.createAlbum(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//Delete
export const fetchDeleteAlbum = createAsyncThunk(
  "/album/delete",
  async (payload, thunkAPI) => {
    try {
      const response = await albumsAPI.deleteAlbum(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//Update
export const fetchUpdateAlbum = createAsyncThunk(
  "/album/update",
  async (payload, thunkAPI) => {
    try {
      const response = await albumsAPI.updateAlbum(payload);

      response.albumUpdated = {
        ...response.albumUpdated,
        ...payload.data,
      };
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    clearAllAlbums(state, action) {
      state.message = "";
      state.errors = null;
    },
  },
  extraReducers: {
    [fetchAlbums.pending](state, action) {
      state.isLoading = true;
      state.data = [];
      state.errors = null;
      state.message = "";
    },
    [fetchAlbums.fulfilled](state, action) {
      state.data = action.payload.albums;
      state.isLoading = false;
    },
    [fetchAlbums.rejected](state, action) {
      console.log(action.payload);
    },
    //Fetch Album Of singer
    [fetchAlbumsOfSinger.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchAlbumsOfSinger.fulfilled](state, action) {
      state.data = action.payload.albums;
      state.isLoading = false;
    },
    [fetchAlbumsOfSinger.rejected](state, action) {
      // console.log(action.payload);
    },
    //Fetch create album
    [fetchCreateAlbum.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchCreateAlbum.fulfilled](state, action) {
      state.message = action.payload.message;
      state.data = [...current(state).data, action.payload.newAlbum];
      state.isLoading = false;
    },
    [fetchCreateAlbum.rejected](state, action) {
      state.errors = action.payload.data.errors;
      console.log(`action`, action);
    },
    //Fetch delete album
    [fetchDeleteAlbum.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchDeleteAlbum.fulfilled](state, action) {
      const newData = current(state).data;

      state.message = action.payload.message;
      state.isLoading = false;
      state.data = newData.filter(
        (data) => data._id !== action.payload.albumDeleted._id
      );
    },
    [fetchDeleteAlbum.rejected](state, action) {
      state.errors = action.payload.data.errors;
    },
    //Fetch Update album
    [fetchUpdateAlbum.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchUpdateAlbum.fulfilled](state, action) {
      const newData = current(state).data;
      console.log(`action`, action);
      const { albumUpdated, message } = action.payload;
      const dataMap = [...newData].map((item) =>
        item._id === albumUpdated._id ? albumUpdated : item
      );
      state.data = [...newData].map((item) =>
        item._id === albumUpdated._id ? albumUpdated : item
      );
      // console.log(`dataMap`, dataMap);
      // console.log(`albumUpdated`, albumUpdated);
      state.message = message;
      state.isLoading = false;
    },
    [fetchUpdateAlbum.rejected](state, action) {
      state.errors = action.payload.data.errors;
    },
  },
});

export default albumsSlice.reducer;
export const { clearAllAlbums } = albumsSlice.actions;
