import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPlayerControls } from "../../features/Player/components/PlayerControls/playerControlsSlice";
import { setIndexSong } from "../../features/Player/indexSongSlice";
import { removePrevSongs } from "../../features/PlayerQueue/prevSongsSlice";
import {
  fetchSongsPlayOfAlbum,
  removeNextSongs,
} from "../../features/PlayerQueue/songsPlaySlice";
import "./styles.scss";
const Card = (props) => {
  const dispatch = useDispatch();
  const songsPlay = useSelector((state) => state.songsPlay);
  const {
    title = "",
    linkImage = "",
    linkTitle = "",
    descriptions = [],
    titleSlug = "",
    handleChooseAlbum,
    album = {
      name: "",
      linkImage: "",
      singers: [],
      slug: "",
    },
  } = props;
  const fallBackImage = (e) => {
    if (e) {
      e.target.src = "http://placehold.it/145x145";
    }
  };

  const onHandleChooseAlbum = (albumSlug) => {
    dispatch(fetchSongsPlayOfAlbum({ albumSlug: albumSlug }));
    dispatch(setPlayerControls({ isPlaying: true }));
    dispatch(setIndexSong({ indexCurrentSong: 0 }));
    dispatch(removeNextSongs([]));
    dispatch(removePrevSongs());
    if (handleChooseAlbum) {
      handleChooseAlbum(albumSlug);
      // dispatch(updateSongList())
    }
  };
  return (
    <div className="card">
      <div className="card-image">
        <img
          src={album.linkImage || linkImage}
          onError={fallBackImage}
          alt=""
          className="card-image__img"
        />
        <div className="card-image__overlay">
          <p className="icon" onClick={() => onHandleChooseAlbum(album.slug)}>
            <i className="far fa-play-circle"></i>
          </p>
        </div>
      </div>
      <div className="card-content">
        <div className="card-content-title">
          <Link
            to={`/albums/${album.slug}` || linkTitle}
            className="card-content__link"
          >
            {album.name || title}
          </Link>
        </div>
        <div className="card-content-descriptions">
          {album?.singers.map((des, index, singers) => {
            return (
              <Link
                key={des.id || index}
                to={`/singers/${des.slug}`}
                className="card-content__link"
              >
                {des?.name} {index > 0 && index < singers.length && ", "}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  linkImage: PropTypes.string,
  linkTitle: PropTypes.string,
  descriptions: PropTypes.array,
};
export default Card;
