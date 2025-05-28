import { SearchX } from "lucide-react";
import PropTypes from "prop-types";

export default function NotFoundMessage({
  message = "요청한 데이터를 찾을 수 없습니다.",
  icon = <SearchX className="w-8 h-8 text-gray-400" />,
}) {
  return (
    <div
      className="py-20 text-center text-gray-400"
      role="status"
      aria-live="polite"
    >
      <div className="mb-3 flex justify-center">{icon}</div>
      <p className="text-base text-gray-500">{message}</p>
    </div>
  );
}

NotFoundMessage.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.node,
};
