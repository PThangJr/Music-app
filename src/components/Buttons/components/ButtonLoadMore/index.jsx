import React from "react";
import classNames from "classnames";
import "./styles.scss";
const ButtonLoadMore = (props) => {
  const { isCenter = false, onClick, isLoadingMore = false } = props;
  const handleLoadMore = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div className={classNames("btn-box", { center: isCenter })}>
      <button
        className={classNames("btn btn--primary btn--blue-neon", {
          animateBounce: isLoadingMore,
        })}
        onClick={handleLoadMore}
        disabled={isLoadingMore}
      >
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>&nbsp;</span>
        <span>m</span>
        <span>o</span>
        <span>r</span>
        <span>e</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </button>
    </div>
  );
};

export default ButtonLoadMore;
