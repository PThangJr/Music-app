import React from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSongsPlayOfAlbum } from "../../features/PlayerQueue/songsPlaySlice";
import { setPlayerControls } from "../../features/Player/components/PlayerControls/playerControlsSlice";
import { setIndexSong } from "../../features/Player/indexSongSlice";
const Card = (props) => {
  const dispatch = useDispatch();
  const {
    title = "",
    linkImage = "",
    linkTitle = "",
    descriptions = [],
    titleSlug = "",
    handleChooseAlbum,
  } = props;
  const fallBackImage = (e) => {
    if (e) {
      e.target.src = "http://placehold.it/145x145";
    }
  };

  const onHandleChooseAlbum = (titleSlug) => {
    dispatch(fetchSongsPlayOfAlbum({ albumSlug: titleSlug }));
    dispatch(setPlayerControls({ isPlaying: true }));
    dispatch(setIndexSong({ indexCurrentSong: 0 }));
    if (handleChooseAlbum) {
      handleChooseAlbum(titleSlug);
    }
  };
  return (
    <div className="card">
      <div className="card-image">
        <img
          src={linkImage}
          onError={fallBackImage}
          alt=""
          className="card-image__img"
        />
        <div className="card-image__overlay">
          <p className="icon" onClick={() => onHandleChooseAlbum(titleSlug)}>
            <i className="far fa-play-circle"></i>
          </p>
        </div>
      </div>
      <div className="card-content">
        <div className="card-content-title">
          <Link to={linkTitle} className="card-content__link">
            {title}
          </Link>
        </div>
        <div className="card-content-descriptions">
          {descriptions.map((des, index) => {
            return (
              <Link
                key={des.id || index}
                to={`/singers/${des.slug}`}
                className="card-content__link"
              >
                {des?.name} ,
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
