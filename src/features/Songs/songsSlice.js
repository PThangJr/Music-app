import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import songsAPI from "../../api/songsAPI";

const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchSongs = createAsyncThunk(
  "/songs",
  async (payload, thunkAPI) => {
    try {
      const response = await songsAPI.getSongs(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchSongsOfAlbum = createAsyncThunk(
  "/songs-of-album",
  async (payload, thunkAPI) => {
    try {
      const response = await songsAPI.getSongsOfAlbum(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchSongsOfSinger = createAsyncThunk(
  "/songs-of-singer",
  async (payload, thunkAPI) => {
    try {
      const response = await songsAPI.getSongsOfSinger(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchCreateSong = createAsyncThunk(
  "/create-song",
  async (payload, thunkAPI) => {
    try {
      const response = await songsAPI.createSong(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchUpdateSong = createAsyncThunk(
  "/update-song",
  async (payload, thunkAPI) => {
    try {
      const response = await songsAPI.updateSong(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchDeleteSong = createAsyncThunk(
  "/delete-song",
  async (payload, thunkAPI) => {
    try {
      const response = await songsAPI.deleteSong(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const songsSlice = createSlice({
  name: "create-song",
  initialState,
  reducers: {
    clearMessageAndErrors(state, action) {
      state.message = "";
      state.errors = null;
    },
  },
  extraReducers: {
    [fetchSongs.pending](state, action) {
      state.isLoading = true;
      state.data = [];
      state.errors = null;
      state.message = "";
    },
    [fetchSongs.fulfilled](state, action) {
      state.data = action.payload.songs;
      localStorage.setItem(
        "songsOfAlbum",
        JSON.stringify(action.payload.songs)
      );
      state.isLoading = false;
    },
    [fetchSongs.rejected](state, action) {
      console.log(action.payload);
    },
    [fetchSongsOfAlbum.pending](state, action) {
      state.isLoading = true;
      state.data = [];
      state.errors = null;
      state.message = "";
    },
    [fetchSongsOfAlbum.fulfilled](state, action) {
      state.data = action.payload.songs;
      localStorage.setItem(
        "songsOfAlbum",
        JSON.stringify(action.payload.songs)
      );
      state.isLoading = false;
    },
    [fetchSongsOfAlbum.rejected](state, action) {
      console.log(action.payload);
    },
    [fetchSongsOfSinger.pending](state, action) {
      state.isLoading = true;
      // state.data = [];
      // state.errors = null;
      // state.message = "";
    },
    [fetchSongsOfSinger.fulfilled](state, action) {
      state.data = action.payload.songs;
      state.isLoading = false;
    },
    [fetchSongsOfSinger.rejected](state, action) {
      console.log(action.payload);
    },
    [fetchCreateSong.pending](state, action) {
      state.isLoading = true;
      // state.errors = null;
      // state.message = "";
    },
    [fetchCreateSong.fulfilled](state, action) {
      // state.data = action.payload.songs;
      state.message = action.payload.message;
      state.isLoading = false;
    },
    [fetchCreateSong.rejected](state, action) {
      state.errors = action.payload.data.errors;
      console.log(action.payload);
    },
    [fetchUpdateSong.pending](state, action) {
      state.isLoading = true;
      // state.errors = null;
      // state.message = "";
    },
    [fetchUpdateSong.fulfilled](state, action) {
      // state.data = action.payload.songs;
      state.message = action.payload.message;
      state.isLoading = false;
    },
    [fetchUpdateSong.rejected](state, action) {
      console.log(action.payload);
    },
    [fetchDeleteSong.pending](state, action) {
      state.isLoading = true;
    },
    [fetchDeleteSong.fulfilled](state, action) {
      // state.data = action.payload.songs;
      console.log(action);

      state.message = action.payload.message;
      state.isLoading = false;
    },
    [fetchDeleteSong.rejected](state, action) {
      state.isLoading = false;
      console.log(action.payload);
    },
  },
});

export default songsSlice.reducer;
export const { clearMessageAndErrors } = songsSlice.actions;
