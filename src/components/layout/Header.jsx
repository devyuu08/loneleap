import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CalendarCheck,
  Footprints,
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
      <Link
        to="/"
        title="메인으로 돌아가기"
        className="flex items-center gap-2 text-xl font-heading font-bold text-gray-900"
      >
        <Footprints className="w-6 h-6 text-inherit" />
        LoneLeap
      </Link>

      {/* 로그인된 경우 */}
      {user ? (
        <nav className="flex items-center gap-6 text-sm text-gray-700">
          <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-body text-sm shadow-sm">
            {user.displayName || user.email}
          </span>

          <NavLink
            to="/itinerary"
            title="혼행 일정 모아보기"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <CalendarCheck className={iconClass} />
            Journeys
          </NavLink>

          <NavLink
            to="/reviews"
            title="여행자들의 감상과 기록"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <MessagesSquare className="w-4 h-4 text-inherit" />
            Stories
          </NavLink>

          <NavLink
            to="/chat"
            title="여행자들과 소통하는 공간"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <MessageCircle className={iconClass} />
            Open Chats
          </NavLink>

          <NavLink
            to="/recommendations"
            title="추천 여행지 살펴보기"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <MapPin className={iconClass} />
            Next Stops
          </NavLink>

          <NavLink
            to="/mypage"
            title="내 정보와 활동 공간"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <UserCircle className={iconClass} />
            My Cabin
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
            Login
          </NavLink>

          <NavLink
            to="/signup"
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            <UserPlus className={iconClass} />
            Sign Up
          </NavLink>
        </nav>
      )}
    </header>
  );
}
