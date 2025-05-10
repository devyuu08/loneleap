import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHeroPage = location.pathname === "/";

  const baseLinkClass =
    "flex items-center gap-1.5 pb-1 hover:text-black font-body";
  const activeLinkClass = "border-b-2 border-black text-black";
  const getNavLinkClass = (isActive) =>
    isActive ? `${baseLinkClass} ${activeLinkClass}` : baseLinkClass;
  const iconClass = "w-4 h-4 text-inherit";

  useEffect(() => {
    if (!isHeroPage) {
      setIsScrolled(true); // Hero 아닌 페이지는 항상 흰 배경
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30); // 30px 이상 스크롤 시 배경 전환
    };

    handleScroll(); // 즉시 한 번 실행(헤더 즉시 반영)

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeroPage]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-white shadow-sm text-gray-900 border-gray-200"
          : "bg-transparent text-white border-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 flex justify-between items-center h-16">
        {/* 로고 */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-heading font-bold whitespace-nowrap"
        >
          <Footprints className="w-6 h-6 text-inherit" />
          LoneLeap
        </Link>

        {/* 네비게이션 */}
        <nav
          className={`flex flex-wrap items-center gap-4 md:gap-6 text-sm ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}
        >
          {user ? (
            <>
              <span className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 font-body shadow-sm whitespace-nowrap">
                {user.displayName || user.email}
              </span>

              <NavLink
                to="/itinerary"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <CalendarCheck className={iconClass} />
                Journeys
              </NavLink>
              <NavLink
                to="/reviews"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <MessagesSquare className={iconClass} />
                Stories
              </NavLink>
              <NavLink
                to="/chat"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <MessageCircle className={iconClass} />
                Open Chats
              </NavLink>
              <NavLink
                to="/recommendations"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <MapPin className={iconClass} />
                Next Stops
              </NavLink>
              <NavLink
                to="/mypage"
                className={({ isActive }) => getNavLinkClass(isActive)}
              >
                <UserCircle className={iconClass} />
                My Cabin
              </NavLink>
            </>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
