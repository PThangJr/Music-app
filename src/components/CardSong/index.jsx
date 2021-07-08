import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFavoriteSong } from "../../features/Favorites/favoriteSongsSlice";
import { setPlayerControls } from "../../features/Player/components/PlayerControls/playerControlsSlice";
import { setCurrentSong } from "../../features/Player/currentSongSlice";
import {
  setPrevSongs,
  updatePrevSongs,
} from "../../features/PlayerQueue/prevSongsSlice";
import { updateSongList } from "../../features/PlayerQueue/songsPlaySlice";
import CardSongActions from "./components/CardSongActions";
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
  const { isPlaying } = useSelector((state) => state.playerControls);
  const songsPlay = useSelector((state) => state.songsPlay);
  const prevSongs = useSelector((state) => state.prevSongs);
  const currentSong = useSelector((state) => state.currentSong);
  const playerControls = useSelector((state) => state.playerControls);
  const favoriteSongs = useSelector((state) => state.favoriteSongs);

  const isFavorite = favoriteSongs.find((fav) => fav?._id === song?._id);
  const isCurrentSong = currentSong._id === song._id;
  // const isCurrentSongPlaying = isCurrentSong && isPlaying === true;
  const { isAdmin } = useSelector((state) => state.auths);
  const handleChooseSong = () => {
    if (currentSong._id === song._id) {
      dispatch(setPlayerControls({ isPlaying: !playerControls.isPlaying }));
    } else {
      dispatch(setPlayerControls({ isPlaying: true }));
      dispatch(setCurrentSong(song));
      if (prevSongs.data.some((prevSong) => prevSong._id === song._id)) {
        const indexSong = prevSongs.data.findIndex(
          (item) => item._id === song._id
        );
        const songsPlayUpdate = [];
        const prevSongsUpdate = prevSongs.data
          .map((song, index) => {
            if (index <= indexSong) {
              return song;
            } else {
              songsPlayUpdate.push(song);
              return undefined;
            }
          })
          .filter((item) => item);
        // console.log(`prevSongsUpdate`, prevSongsUpdate);
        // console.log(`songsPlayUpdate`, songsPlayUpdate);
        dispatch(updatePrevSongs(prevSongsUpdate));
        dispatch(updateSongList([...songsPlayUpdate, ...songsPlay.data]));
        // dispatch(
        //   updateSongList([
        //     ...prevSongs.data.filter((songPlay) => songPlay._id !== song._id),
        //     ...songsPlay.data,
        //   ])
        // );
      } else if (songsPlay.data.some((songPlay) => songPlay._id === song._id)) {
        dispatch(setPrevSongs(song));
        dispatch(
          updateSongList(songsPlay.data.filter((s) => s._id !== song._id))
        );
      } else {
        dispatch(setPrevSongs(song));
      }
    }
    // dispatch(updateSongList([song]));
    // dispatch(setIndexSong({ indexCurrentSong: 0 }));
  };
  const handleFavoriteSong = (e) => {
    e.stopPropagation();
    // dispatch(setFavoriteSongs(song));
    dispatch(addFavoriteSong(song));
  };
  const handleStoppropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className={classNames(
        "card-song ",
        { "card-song--full-info": fullInfo },
        { "card-song--active": isCurrentSong },
        { className: className }
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
          {!isPlaying && isCurrentSong && (
            <p className="icon icon--pause">
              <i className="far fa-pause-circle"></i>
            </p>
          )}
        </div>
        <div className="card-song-info text-hover">
          <p className="card-song-info__name text-hover">{song.name || name}</p>
          <div className="card-song-info__descriptions">
            {singers.map((singer, index) => {
              return (
                <Link
                  key={singer._id + "-singers"}
                  to={`/singers/${singer.slug}`}
                  className="card-song-info__description"
                  onClick={handleStoppropagation}
                >
                  {singer.name}
                  {(singers.length > 1 &&
                    index < singers.length - 1 &&
                    " , ") ||
                    ""}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {fullInfo && (
        <div className="card-song-views text-hover">
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
      {/* <div className="sub-controls">
        
      </div>
      <button className="btn btn--primary btn--black btn--check">
          <i className="fas fa-fast-forward"></i>
        </button> */}
      {isAdmin && fullInfo && <CardSongActions song={song} />}
    </div>
  );
};

CardSong.propTypes = {
  linkImage: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
};

export default CardSong;
