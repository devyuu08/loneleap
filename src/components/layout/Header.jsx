import {
  CalendarCheck,
  Footprints,
  LogIn,
  MapPin,
  MessageCircle,
  MessagesSquare,
  UserCircle,
  UserPlus,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";

export default function Header() {
  const user = useSelector((state) => state.user.user);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const heroPaths = [
    "/",
    "/itinerary",
    "/reviews",
    "/recommendations",
    "/chat",
    "/mypage",
    "/login",
    "/signup",
  ];
  const isHeroPage = heroPaths.includes(location.pathname);

  const baseLinkClass =
    "flex items-center gap-1.5 pb-1 hover:text-black font-body";
  const activeLinkClass = "border-b-2 border-black text-black";
  const getNavLinkClass = (isActive) =>
    isActive ? `${baseLinkClass} ${activeLinkClass}` : baseLinkClass;
  const iconClass = "w-4 h-4 text-inherit";

  useEffect(() => {
    if (!isHeroPage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeroPage]);

  const navItems = user ? (
    <>
      <span className="shrink-0 max-w-xs truncate px-4 py-1.5 rounded-full bg-[#f2f2f2]/70 text-gray-800 font-body shadow-sm border border-gray-300 text-sm font-medium">
        <span className="text-[11px] uppercase tracking-widest text-gray-500 mr-1">
          Traveler
        </span>
        <span className="text-gray-800 font-semibold">
          {(user.displayName || user.email)?.split("@")[0] || "익명"}
        </span>
      </span>

      <NavLink
        to="/itinerary"
        className={({ isActive }) => getNavLinkClass(isActive)}
      >
        <CalendarCheck className={iconClass} /> Journeys
      </NavLink>
      <NavLink
        to="/reviews"
        className={({ isActive }) => getNavLinkClass(isActive)}
      >
        <MessagesSquare className={iconClass} /> Stories
      </NavLink>
      <NavLink
        to="/chat"
        className={({ isActive }) => getNavLinkClass(isActive)}
      >
        <MessageCircle className={iconClass} /> Open Chats
      </NavLink>
      <NavLink
        to="/recommendations"
        className={({ isActive }) => getNavLinkClass(isActive)}
      >
        <MapPin className={iconClass} /> Next Stops
      </NavLink>
      <NavLink
        to="/mypage"
        className={({ isActive }) => getNavLinkClass(isActive)}
      >
        <UserCircle className={iconClass} /> My Cabin
      </NavLink>
    </>
  ) : (
    <>
      <NavLink
        to="/login"
        className={({ isActive }) => getNavLinkClass(isActive)}
      >
        <LogIn className={iconClass} /> Login
      </NavLink>
      <NavLink
        to="/signup"
        className={({ isActive }) => getNavLinkClass(isActive)}
      >
        <UserPlus className={iconClass} /> Sign Up
      </NavLink>
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled || isMobileMenuOpen
          ? "bg-white shadow-sm text-gray-900 border-gray-200"
          : "bg-transparent text-white border-transparent"
      }`}
    >
      <div className="w-full mx-auto px-4 md:px-6 flex justify-between items-center h-16">
        {/* 로고 */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-heading font-bold whitespace-nowrap"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-2 text-xl font-heading font-bold whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
          >
            <Footprints className="w-6 h-6 text-inherit" />
            LoneLeap
          </motion.div>
        </Link>

        {/* 모바일 메뉴 버튼 */}
        <button
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* 데스크탑 메뉴 */}
        <nav className="hidden lg:flex flex-wrap items-center gap-4 md:gap-6 text-sm max-w-full overflow-x-auto">
          {navItems}
        </nav>
      </div>

      {/* 모바일 메뉴 드롭다운 */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden bg-white border-t border-gray-200 shadow-sm text-gray-800 px-4 pb-4`}
        >
          <nav className="flex flex-col gap-3 text-sm pt-2">{navItems}</nav>
        </div>
      )}
    </header>
  );
}
