import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setFavoriteSongs,
  setPlayerControls,
} from "../../features/Player/components/PlayerControls/playerControlsSlice";
import { setCurrentSong } from "../../features/Player/currentSongSlice";
import { setPrevSongs } from "../../features/PlayerQueue/prevSongsSlice";
import { updateSongList } from "../../features/PlayerQueue/songsPlaySlice";
import "./styles.scss";
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
  const { favorites, isPlaying } = useSelector((state) => state.playerControls);
  const songsPlay = useSelector((state) => state.songsPlay);
  const prevSongs = useSelector((state) => state.prevSongs);
  const currentSong = useSelector((state) => state.currentSong);
  const playerControls = useSelector((state) => state.playerControls);

  const isFavorite = favorites.find((fav) => fav?._id === song?._id);
  const isCurrentSong = currentSong._id === song._id;
  const handleChooseSong = () => {
    if (currentSong._id === song._id) {
      dispatch(setPlayerControls({ isPlaying: !playerControls.isPlaying }));
    } else {
      dispatch(setPlayerControls({ isPlaying: true }));
      dispatch(setPrevSongs(song));
      dispatch(setCurrentSong(song));
      if (prevSongs.data.find((prevSong) => prevSong._id === song._id)) {
        console.log("prevSong match");

        dispatch(
          updateSongList([
            ...prevSongs.data.filter((songPlay) => songPlay._id !== song._id),
            ...songsPlay.data,
          ])
        );
      }
      if (songsPlay.data.find((songPlay) => songPlay._id === song._id)) {
        console.log("songPlay match");

        dispatch(
          updateSongList(songsPlay.data.filter((s) => s._id !== song._id))
        );
      }
    }
    // dispatch(updateSongList([song]));
    // dispatch(setIndexSong({ indexCurrentSong: 0 }));
  };
  const handleFavoriteSong = (e) => {
    e.stopPropagation();
    dispatch(setFavoriteSongs(song));
  };
  return (
    <div
      className={classNames(
        "card-song ",
        { "card-song--full-info": fullInfo },
        { "card-song--active": isCurrentSong }
      )}
    >
      <div className="card-song-content" onClick={handleChooseSong}>
        <div className="card-song-content-image">
          <img
            src={song.linkImage || linkImage}
            onError={fallbackImage}
            alt=""
            className="card-song-content-image__img"
          ></img>
          {!isCurrentSong && (
            <p className="icon">
              <i className="far fa-play-circle"></i>
            </p>
          )}
          {isPlaying && isCurrentSong && (
            <p className="icon icon--playing">
              <i className=""></i>
            </p>
          )}
        </div>
        <div className="card-song-info">
          <p className="card-song-info__name">{song.name || name}</p>
          {singers.map((singer, index) => {
            return (
              <Link
                key={singer._id + "-singers"}
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

      <button
        className={
          "btn  btn--black btn--favorite " + (isFavorite ? "btn--purple" : "")
        }
        onClick={handleFavoriteSong}
      >
        <i className="fas fa-heart"></i>
      </button>
    </div>
  );
};

CardSong.propTypes = {
  linkImage: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
};

export default CardSong;
