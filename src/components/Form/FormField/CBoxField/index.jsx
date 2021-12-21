import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.scss";

const CBoxField = (props) => {
  const {
    name = "",
    onChange,
    className = "",
    label = "",
    disabled = false,
    checked = false,
    dataId = "",
  } = props;
  const handleInputValue = (e) => {
    if (onChange) {
      const name = e.target.name;

      const dataId = e.target.getAttribute("dataId");
      onChange({ [name]: dataId });
    }
  };
  return (
    <div className="checkbox">
      <input
        onChange={handleInputValue}
        className={classNames("checkbox-field", { [className]: className })}
        type="checkbox"
        name={name}
        id={dataId}
        dataId={dataId}
        disabled={disabled}
        checked={checked}
      />
      <label htmlFor={dataId}>{label}</label>
    </div>
  );
};

CBoxField.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
};

export default CBoxField;
