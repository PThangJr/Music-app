import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SongsList from "../../components/SongsList";
import { removeFavoriteSongs } from "./favoriteSongsSlice";
import Swal from "sweetalert2";
import ButtonPlayAll from "../../components/Buttons/components/ButtonPlayAll";
import "./styles.scss";
const Favorites = () => {
  // let favoriteSongs = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoriteSongs = useSelector((state) => state.favoriteSongs);
  const dispatch = useDispatch();
  const handleDeleteAllFavorites = () => {
    if (favoriteSongs?.length) {
      Swal.fire({
        title: "Are you sure?",
        text: "Bạn có muốn xoá tất cả bài hát yêu thích hay không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removeFavoriteSongs());
          Swal.fire("Deleted!", "Xoá bài hát thành công!", "success");
        }
      });
      // if (window.confirm("Bạn muốn xoá hết danh sách nhạc yêu thích?")) {
      //   dispatch(removeFavoriteSongs());
      // }
    }
  };
  return (
    <div className="favorites">
      <div className="favorites-header">
        <h3 className="heading-15 favorites-header__heading">
          Bài hát yêu thích
        </h3>
        <div className="favorites-buttons">
          <ButtonPlayAll songs={favoriteSongs} />
          <button
            className="btn btn--primary btn--danger"
            onClick={handleDeleteAllFavorites}
          >
            Xoá tất cả
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
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
