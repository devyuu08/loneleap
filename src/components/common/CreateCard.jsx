import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import PropTypes from "prop-types";

/**
 * 생성 카드 공통 컴포넌트
 *
 * @param {string} to - 이동할 경로
 * @param {string} title - 강조 텍스트
 * @param {string} description - 서브 텍스트
 * @param {string} buttonLabel - 버튼 텍스트
 */
export default function CreateCard({ to, title, description, buttonLabel }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(to);
        }
      }}
      className="group bg-white border border-dashed border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer flex items-center justify-center text-center px-6 py-16"
    >
      <div>
        <div className="flex justify-center mb-2">
          <Plus className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm font-semibold text-gray-700">{title}</p>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
        <div className="mt-4">
          <button className="px-4 py-1.5 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition">
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

CreateCard.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};
