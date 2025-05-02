import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.user.user);

  return (
    <header className="bg-white px-6 py-4 border-b flex justify-between items-center shadow-sm">
      {/* 로고 */}
      <Link to="/" className="text-xl font-bold text-gray-900">
        LoneLeap
      </Link>

      {/* 로그인된 경우 */}
      {user ? (
        <div className="flex items-center gap-5 text-sm text-gray-700">
          <span className="text-gray-600">
            {user.displayName || user.email}
          </span>

          <NavLink
            to="/itinerary"
            className={({ isActive }) =>
              isActive ? "font-semibold text-black" : "hover:text-black"
            }
          >
            내 일정
          </NavLink>

          <NavLink
            to="/reviews"
            className={({ isActive }) =>
              isActive ? "font-semibold text-black" : "hover:text-black"
            }
          >
            여행 리뷰
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive ? "font-semibold text-black" : "hover:text-black"
            }
          >
            채팅 목록
          </NavLink>

          <NavLink
            to="/recommendations"
            className={({ isActive }) =>
              isActive ? "font-semibold text-black" : "hover:text-black"
            }
          >
            추천 여행지
          </NavLink>

          <NavLink
            to="/mypage"
            className={({ isActive }) =>
              isActive ? "font-semibold text-black" : "hover:text-black"
            }
          >
            마이페이지
          </NavLink>
        </div>
      ) : (
        // 로그인되지 않은 경우
        <div className="flex gap-4 text-sm text-gray-700">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "font-semibold text-black" : "hover:text-black"
            }
          >
            로그인
          </NavLink>

          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? "font-semibold text-black" : "hover:text-black"
            }
          >
            회원가입
          </NavLink>
        </div>
      )}
    </header>
  );
}
