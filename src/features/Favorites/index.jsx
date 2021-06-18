import React from "react";
import SongsList from "../../components/SongsList";

const Favorites = () => {
  const favoriteSongs = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <div className="favorites">
      {favoriteSongs.length ? (
        <SongsList songs={favoriteSongs.length ? favoriteSongs : []} fullInfo />
      ) : (
        <h3>Không có bài hát yêu thích nào</h3>
      )}
    </div>
  );
};

export default Favorites;
