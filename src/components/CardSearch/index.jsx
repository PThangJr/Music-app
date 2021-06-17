import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./styles.scss";
const CardSearch = (props) => {
  return (
    <Link className="card-search">
      <div className="card-search-image">
        <img
          src="https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/4/1/2/a/412a76e49a4321a7df52295f2034cf04.jpg"
          alt=""
          className="card-search-image__img"
        />
      </div>
      <div className="card-search-info">
        <p className="card-search-info__name">Đây là tên</p>
        <p className="card-search-info__description">Đây là description</p>
      </div>
    </Link>
  );
};

CardSearch.propTypes = {};

export default CardSearch;
