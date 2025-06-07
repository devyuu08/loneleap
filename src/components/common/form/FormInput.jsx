import React from "react";
import PropTypes from "prop-types";
import ErrorMessage from "@/components/common/feedback/ErrorMessage";
import {
  formBaseStyle,
  formVisualStyle,
  getFormBorderColor,
} from "@/styles/formStyles";

function FormInput({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error,
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-sm font-bold text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`${formBaseStyle} ${getFormBorderColor(
          error
        )} ${formVisualStyle}`}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

FormInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default React.memo(FormInput);
