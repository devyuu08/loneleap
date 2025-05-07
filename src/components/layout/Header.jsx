import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CalendarCheck,
  LogIn,
  MapPin,
  MessageCircle,
  MessagesSquare,
  UserCircle,
  UserPlus,
} from "lucide-react";

export default function Header() {
  const user = useSelector((state) => state.user.user);

  const baseLinkClass =
    "flex items-center gap-1.5 pb-1 hover:text-black font-body";
  const activeLinkClass = "border-b-2 border-black text-black";
  const getNavLinkClass = (isActive) =>
    isActive ? `${baseLinkClass} ${activeLinkClass}` : baseLinkClass;
  const iconClass = "w-4 h-4 text-inherit";

  return (
    <header className="bg-white px-6 py-4 border-b flex justify-between items-center shadow-sm">
      {/* 로고 */}
      <Link to="/" className="text-xl font-heading font-bold text-gray-900">
        LoneLeap
      </Link>

      {/* 로그인된 경우 */}
      {user ? (
        <nav className="flex items-center gap-6 text-sm text-gray-700">
          <span className="text-gray-600 font-body">
            {user.displayName || user.email}
          </span>

          <NavLink
            to="/itinerary"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <CalendarCheck className={iconClass} />내 일정
          </NavLink>

          <NavLink
            to="/reviews"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <MessagesSquare className="w-4 h-4 text-inherit" />
            여행 리뷰
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <MessageCircle className={iconClass} />
            채팅 목록
          </NavLink>

          <NavLink
            to="/recommendations"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <MapPin className={iconClass} />
            추천 여행지
          </NavLink>

          <NavLink
            to="/mypage"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <UserCircle className={iconClass} />
            마이페이지
          </NavLink>
        </nav>
      ) : (
        // 로그인되지 않은 경우
        <nav className="flex gap-4 text-sm text-gray-700">
          <NavLink
            to="/login"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <LogIn className={iconClass} />
            로그인
          </NavLink>

          <NavLink
            to="/signup"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <UserPlus className={iconClass} />
            회원가입
          </NavLink>
        </nav>
      )}
    </header>
  );
}
