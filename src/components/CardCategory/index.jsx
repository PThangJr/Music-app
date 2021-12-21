import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
const CardCategory = (props) => {
  const { category } = props;
  return (
    <Link to={`/categories/${category?.slug}`} className="card-category">
      <div className="card-category-image">
        <img
          src={
            category?.linkImage ||
            "https://i1.sndcdn.com/artworks-000387102789-k6i8bi-t500x500.jpg"
          }
          alt=""
          className="card-category-image__img"
        />
      </div>
      <div className="card-category-name">{category?.name}</div>
    </Link>
  );
};

CardCategory.propTypes = {
  category: PropTypes.object,
};

export default CardCategory;
