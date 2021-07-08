import React from "react";
import "./styles.scss";
const SpinerLoading = (props) => {
  return <div className="loader" style={props.style}></div>;
};

SpinerLoading.propTypes = {};

export default SpinerLoading;
