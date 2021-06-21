import React, { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./styles.scss";
const InputField = (props) => {
  const {
    placeholder = "",
    type = "text",
    name = "",
    onChange,
    onFocus,
    className = "",
    fullWidth = "",
    disabled = false,
    defaultValues = "",
    debounce = false,
    selectedAllText = false,
  } = props;
  const typingTimeOutRef = useRef(null);

  const handleInputValue = (e) => {
    if (onChange) {
      const name = e.target.name.trim();
      const value = e.target.value;
      if (debounce) {
        // Debounce
        if (typingTimeOutRef.current) {
          clearTimeout(typingTimeOutRef.current);
        }
        typingTimeOutRef.current = setTimeout(() => {
          onChange({ [name]: value });
        }, 300);
      } else {
        onChange({ [name]: value });
      }
    }
  };
  const handleFocus = (e) => {
    if (selectedAllText) {
      e.target.select();
    }
    if (onFocus) {
      onFocus();
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
      onFocus={handleFocus}
    />
  );
};

InputField.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  selectedAllText: PropTypes.bool,
  onFocus: PropTypes.func,
};

export default InputField;
