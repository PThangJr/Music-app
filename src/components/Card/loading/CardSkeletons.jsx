import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.scss";
const CardSkeletons = (props) => {
  const { totalItems = 0, className } = props;
  const arr = [];
  for (let i = 0; i < totalItems; i++) {
    arr.push(i);
  }

  return (
    <div className="row">
      {arr.map((item, index) => {
        return (
          <div
            key={index + "name"}
            className={classNames(
              {
                "col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 ": !className,
              },
              { [className]: className }
            )}
          >
            <div className="card-skeleton">
              <div className="card-skeleton__loader"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

CardSkeletons.propTypes = {
  className: PropTypes.string,
  totalItems: PropTypes.number,
};

export default CardSkeletons;
