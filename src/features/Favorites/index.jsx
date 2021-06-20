import React, { useEffect, useState } from "react";
import SongsList from "../../components/SongsList";
import "./styles.scss";
const Favorites = () => {
  // let favoriteSongs = JSON.parse(localStorage.getItem("favorites")) || [];
  const [favoriteSongs, setFavoritesSong] = useState([]);
  useEffect(() => {
    setFavoritesSong(JSON.parse(localStorage.getItem("favorites")));
  }, []);
  const handleDeleteAllFavorites = () => {
    if (window.confirm("Bạn muốn xoá hết danh sách nhạc yêu thích?")) {
      localStorage.removeItem("favorites");
      setFavoritesSong([]);
    }
  };
  return (
    <div className="favorites">
      <div className="favorites-header">
        <h3 className="heading-15 favorites-header__heading">
          Bài hát yêu thích
        </h3>
        <button
          className="btn btn--primary btn--danger"
          onClick={handleDeleteAllFavorites}
        >
          <i className="fas fa-trash-alt"></i>
          Xoá tất cả
        </button>
      </div>
      {favoriteSongs?.length ? (
        <SongsList
          songs={favoriteSongs?.length ? favoriteSongs : []}
          fullInfo
        />
      ) : (
        <h3>Không có bài hát yêu thích nào</h3>
      )}
    </div>
  );
};

export default Favorites;
