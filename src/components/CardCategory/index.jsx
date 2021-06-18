import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles.scss";
const CardCategory = (props) => {
  const { category } = props;
  const match = useRouteMatch();
  return (
    <Link to={`${match.path}/${category?.slug}`} className="card-category">
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
