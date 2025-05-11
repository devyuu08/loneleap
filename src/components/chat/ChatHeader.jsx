import { ArrowLeft, MoreVertical } from "lucide-react";

import PropTypes from "prop-types";

export default function ChatHeader({
  title = "채팅방",
  userName = "사용자",
  onBack,
}) {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-white">
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="md:hidden">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <div>
          <h1 className="text-sm font-semibold text-gray-900">{title}</h1>
          <p className="py-1 text-xs text-gray-500">
            <span className="font-medium text-black">{userName}</span>
            님의 여행 이야기 공간
          </p>
        </div>
      </div>

      <button aria-label="더보기">
        <MoreVertical className="w-5 h-5 text-gray-500" />
      </button>
    </header>
  );
}

ChatHeader.propTypes = {
  title: PropTypes.string,
  userName: PropTypes.string,
  onBack: PropTypes.func,
};
