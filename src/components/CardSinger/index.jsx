import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardSinger = (props) => {
  const fallBackImage = (e) => {
    if (e) {
      e.target.src = "http://placehold.it/145x145";
    }
  };
  const {
    singer = {
      name: "",
      linkImage: "",
      slug: "",
    },
  } = props;
  return (
    <div className="card card--singer">
      <Link to={`/singers/${singer.slug}`} className="card-image">
        <img
          src={singer.linkImage}
          onError={fallBackImage}
          alt=""
          className="card-image__img"
        />
        {/* <div className="card-image__overlay">
          <p className="icon">
            <i className="far fa-play-circle"></i>
          </p>
        </div> */}
      </Link>
      <div className="card-content">
        <div className="card-content-title">
          <Link to={`/singers/${singer.slug}`} className="card-content__link">
            {singer.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

CardSinger.propTypes = {};

export default CardSinger;
