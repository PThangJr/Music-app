import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  data: [],
};
const prevSongsSlice = createSlice({
  name: "prev-songs",
  initialState,
  reducers: {
    setPrevSongs(state, action) {
      const song = action.payload;

      let newState = { ...state };
      if (!newState.data.find((item) => item._id === song._id)) {
        newState = { ...newState, data: [...newState.data, song] };
      } else {
        newState = { ...newState, data: [song] };
      }
      return newState;
    },
    choosePrevSong(state, action) {
      let newState = { ...state };
      newState.data.pop();
    },
    removePrevSongs(state, action) {
      state.data = [];
    },
    removePrevSongsExceptCurrentSong(state, action) {
      const { currentSong } = action.payload;
      const newData = current(state).data;
      state.data = newData.filter((dt) => dt._id === currentSong._id);
    },
  },
});
export default prevSongsSlice.reducer;
export const {
  setPrevSongs,
  choosePrevSong,
  removePrevSongs,
  removePrevSongsExceptCurrentSong,
} = prevSongsSlice.actions;
