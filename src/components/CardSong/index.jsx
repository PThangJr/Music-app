import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavoriteSongs,
  setPlayerControls,
} from "../../features/Player/components/PlayerControls/playerControlsSlice";
import { updateSongList } from "../../features/PlayerQueue/songsPlaySlice";
import { setIndexSong } from "../../features/Player/indexSongSlice";
import { setCurrentSong } from "../../features/Player/currentSongSlice";
import { setPrevSongs } from "../../features/PlayerQueue/prevSongsSlice";
const CardSong = (props) => {
  const dispatch = useDispatch();
  let {
    fullInfo,
    linkImage = "",
    name = "",
    descriptions = [],
    className = "",
    views = 0,
    song = {
      linkImage: "",
      name: "",
      singers: [],
      slug: "",
      views: 0,
    },
  } = props;
  const fallbackImage = (e) => {
    if (e) {
      e.target.src = "http://placehold.it/60x60";
    }
  };
  let singers = song.singers.length ? song.singers : descriptions;
  const { favorites } = useSelector((state) => state.playerControls);
  const isFavorite = favorites.find((fav) => fav?._id === song?._id);
  const handleChooseSong = () => {
    // console.log("click");
    dispatch(setPlayerControls({ isPlaying: true }));
    dispatch(setCurrentSong(song));
    dispatch(setPrevSongs(song));
    // dispatch(updateSongList([song]));
    // dispatch(setIndexSong({ indexCurrentSong: 0 }));
  };
  const handleFavoriteSong = (e) => {
    e.stopPropagation();
    dispatch(setFavoriteSongs(song));
  };
  return (
    <div
      className={"card-song " + ((fullInfo && "card-song--full-info") || "")}
    >
      <div className="card-song-content" onClick={handleChooseSong}>
        <img
          src={song.linkImage || linkImage}
          onError={fallbackImage}
          alt=""
          className="card-song-content__img"
        ></img>
        <div className="card-song-info">
          <p className="card-song-info__name">{song.name || name}</p>
          {singers.map((singer, index) => {
            return (
              <Link
                key={singer._id}
                to={`/singers/${singer.slug}`}
                className="card-song-info__description"
              >
                {singer.name}
                {(singers.length > 1 && index < singers.length - 1 && " , ") ||
                  ""}
              </Link>
            );
          })}
        </div>
      </div>
      {fullInfo && (
        <div className="card-song-views">
          <p className="icon">
            <i className="fas fa-headphones"></i>
          </p>
          {song.views || views || "10.000"}
        </div>
      )}

      {fullInfo && (
        <button
          className={
            "btn btn--favorite  btn--black " + (isFavorite ? "btn--purple" : "")
          }
          onClick={handleFavoriteSong}
        >
          <i className="fas fa-heart"></i>
        </button>
      )}
    </div>
  );
};

CardSong.propTypes = {
  linkImage: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
};

export default CardSong;
