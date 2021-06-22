import { toast } from "react-toastify";
const { createSlice, current } = require("@reduxjs/toolkit");

const initialState = JSON.parse(localStorage.getItem("favorites")) || [];

const favoriteSongsSlice = createSlice({
  name: "favorite-songs",
  initialState,
  reducers: {
    addFavoriteSong(state, action) {
      let currentState = [...current(state)];

      if (currentState.find((item) => item._id === action.payload._id)) {
        const filter = currentState.filter(
          (fav) => fav._id !== action.payload._id
        );
        toast.error(`💔 Xoá bài hát "${action.payload.name}" khỏi Favorites`, {
          autoClose: 2000,
        });
        currentState = filter;
      } else {
        toast.success(
          `💖 Thêm bài hát "${action.payload.name}" vào Favorites`,
          {
            autoClose: 2000,
          }
        );

        currentState.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(currentState));
      return currentState;
    },
    removeFavoriteSongs(state, action) {
      localStorage.removeItem("favorites");
      return [];
    },
  },
});
export default favoriteSongsSlice.reducer;
export const { addFavoriteSong, removeFavoriteSongs } =
  favoriteSongsSlice.actions;
