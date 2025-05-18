import { ArrowLeft, MoreVertical } from "lucide-react";

import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

import { LogOut } from "lucide-react";

export default function ChatHeader({
  title = "채팅방",
  userName = "사용자",
  onBack,
  onLeave,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-white">
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

      <div className="relative" ref={menuRef}>
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="더보기">
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>

        {menuOpen && (
          <ul className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10 text-sm text-gray-700">
            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLeave();
                }}
                className="w-full text-left px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                채팅방 나가기
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

ChatHeader.propTypes = {
  title: PropTypes.string,
  userName: PropTypes.string,
  onBack: PropTypes.func,
};
