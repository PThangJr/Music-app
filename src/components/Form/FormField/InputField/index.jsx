import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.scss";
const InputField = (props) => {
  const {
    placeholder = "",
    type = "text",
    name = "",
    onChange,
    className = "",
    fullWidth = "",
    disabled = false,
    defaultValues = "",
  } = props;
  const handleInputValue = (e) => {
    if (onChange) {
      const name = e.target.name;
      const value = e.target.value;
      onChange({ [name]: value });
    }
  };
  return (
    <input
      placeholder={placeholder}
      onChange={handleInputValue}
      className={classNames(
        "input-field",
        { [className]: className },
        { "input-field--full-width": fullWidth }
      )}
      type={type}
      name={name}
      disabled={disabled}
      defaultValue={defaultValues}
    />
  );
};

InputField.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputField;
