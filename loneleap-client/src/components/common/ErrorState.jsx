// src/components/ErrorState.jsx
import PropTypes from "prop-types";

export default function ErrorState({ message }) {
  return (
    <div className="py-10 text-center">
      <div className="text-red-500 text-lg font-medium mb-2">
        🚫 오류가 발생했습니다
      </div>
      <p className="text-gray-500 text-sm">
        {message || "데이터를 불러올 수 없습니다. 잠시 후 다시 시도해주세요."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 transition"
      >
        새로고침
      </button>
    </div>
  );
}

ErrorState.propTypes = {
  message: PropTypes.string,
};
