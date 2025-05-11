import { ArrowLeft, MoreVertical } from "lucide-react";

import PropTypes from "prop-types";

export default function ChatHeader({
  title = "채팅방",
  userName = "사용자",
  onBack,
}) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white shadow-sm">
      {/* 왼쪽: 뒤로가기 + 방 정보 */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="md:hidden">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        <div>
          <h1 className="text-base font-semibold text-gray-900">{title}</h1>
          <p className="text-xs text-gray-500">
            {userName}님이 개설한 오픈 채팅
          </p>
        </div>
      </div>

      {/* 오른쪽: 더보기 버튼 (옵션) */}
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
