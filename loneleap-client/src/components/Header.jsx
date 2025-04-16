import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const user = useSelector((state) => state.user.user);

  return (
    <header className="bg-white px-6 py-4 border-b flex justify-between items-center shadow-sm">
      <Link to="/" className="text-xl font-bold text-gray-900">
        LoneLeap
      </Link>

      {user ? (
        <div className="flex items-center gap-5 text-sm text-gray-700">
          <span className="text-gray-600">{user.email}</span>
          <Link to="/itinerary" className="hover:text-black">
            내 일정
          </Link>
          <Link to="/reviews" className="hover:text-black">
            여행 리뷰
          </Link>
          <Link to="/chat" className="hover:text-black">
            채팅 목록
          </Link>
          <Link to="/mypage" className="hover:text-black">
            마이페이지
          </Link>
        </div>
      ) : (
        <div className="flex gap-4 text-sm text-gray-700">
          <Link to="/login" className="hover:text-black">
            로그인
          </Link>
          <Link to="/signup" className="hover:text-black">
            회원가입
          </Link>
        </div>
      )}
    </header>
  );
}
