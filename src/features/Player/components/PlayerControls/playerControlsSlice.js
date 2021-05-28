import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songId: "",
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};
const playerControlsSlice = createSlice({
  name: "player-controls",
  initialState,
  reducers: {
    setPlayerControls(state, action) {
      console.log(action.payload);

      return { ...state, ...action.payload };
    },
    setFavoriteSongs(state, action) {
      const currentState = [...current(state).favorites];
      if (currentState.find((item) => item._id === action.payload._id)) {
        const filter = currentState.filter(
          (fav) => fav._id !== action.payload._id
        );
        state.favorites = filter;
      } else {
        state.favorites.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});
export default playerControlsSlice.reducer;
export const { setPlayerControls, setFavoriteSongs } =
  playerControlsSlice.actions;
