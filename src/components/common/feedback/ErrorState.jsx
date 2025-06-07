import { AlertOctagon } from "lucide-react";
import PropTypes from "prop-types";
import { buttonVariants } from "@/utils/buttonVariants";

export default function ErrorState({ message, onRetry }) {
  return (
    <div
      className="py-12 text-center text-gray-600"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex justify-center mb-3">
        <AlertOctagon className="w-8 h-8 text-red-400" />
      </div>
      <p className="text-lg font-semibold text-red-500">오류가 발생했습니다</p>
      <p className="text-sm mt-1 text-gray-500">
        {message || "데이터를 불러올 수 없습니다. 잠시 후 다시 시도해주세요."}
      </p>
      <button
        onClick={onRetry || (() => window.location.reload())}
        className={`mt-5 inline-block text-sm rounded px-4 py-2 ${buttonVariants.outline}`}
      >
        새로고침
      </button>
    </div>
  );
}

ErrorState.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
};
