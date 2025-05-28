import PropTypes from "prop-types";
import ErrorMessage from "@/components/common/feedback/ErrorMessage";

export default function FormInput({
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
          className="block mb-1 text-sm font-medium text-gray-700"
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
        className={`w-full px-4 py-3 rounded-md border ${
          error ? "border-red-400" : "border-gray-300"
        } bg-gray-50 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300`}
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
