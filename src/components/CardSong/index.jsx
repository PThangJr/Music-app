import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./styles.scss";
import { useSelector } from "react-redux";
const CardSong = (props) => {
  const {
    fullInfo,
    linkImage = "",
    name = "",
    descriptions = [],
    className = "",
    views = 0,
  } = props;
  const fallbackImage = (e) => {
    if (e) {
      e.target.src = "http://placehold.it/60x60";
    }
  };
  const playerControls = useSelector((state) => state.playerControls);

  return (
    <div className={"card-song " + ((className && className) || "")}>
      <div className="card-song-content">
        <img
          src={linkImage}
          onError={fallbackImage}
          alt=""
          className="card-song-content__img"
        ></img>
        <div className="card-song-info">
          <p className="card-song-info__name">{name}</p>
          {descriptions.map((des) => {
            return (
              <Link
                key={des._id}
                to="/"
                className="card-song-info__description"
              >
                {des.name}
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
          {views || "10.000"}
        </div>
      )}

      {fullInfo && (
        <button className={"btn btn--favorite btn--black "}>
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
