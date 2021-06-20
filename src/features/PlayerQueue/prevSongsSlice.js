import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  // data: JSON.parse(localStorage.getItem("currentSong"))
  //   ? [JSON.parse(localStorage.getItem("currentSong"))]
  //   : [],
  data: JSON.parse(localStorage.getItem("prevSongs")) || [],
};
const setLocaleStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};
const removeLocaleStorage = (name) => {
  localStorage.removeItem(name);
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
      // console.log(`newState`, newState);
      setLocaleStorage("prevSongs", newState.data);
      return newState;
    },
    updatePrevSongs(state, action) {
      state.data = action.payload;
      setLocaleStorage("prevSongs", action.payload);
    },
    choosePrevSong(state, action) {
      let newState = { ...state };
      const newData = [...current(state).data];
      newState.data.pop();
      newData.pop();
      setLocaleStorage("prevSongs", newData);
    },
    removePrevSongs(state) {
      state.data = [];
      removeLocaleStorage("prevSongs");
    },
    removePrevSongsExceptCurrentSong(state, action) {
      const { currentSong } = action.payload;
      const newData = current(state).data;
      const dataFilter = newData.filter((dt) => dt._id === currentSong._id);
      localStorage.setItem("prevSongs", JSON.stringify(dataFilter));
      state.data = dataFilter;
    },
  },
});
export default prevSongsSlice.reducer;
export const {
  setPrevSongs,
  choosePrevSong,
  removePrevSongs,
  removePrevSongsExceptCurrentSong,
  updatePrevSongs,
} = prevSongsSlice.actions;
