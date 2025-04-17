// src/components/mypage/ProfileSection.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "services/auth";
import { clearUser } from "store/userSlice";
import PropTypes from "prop-types";

export default function ProfileSection({ user = null }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout(); // Firebase 로그아웃
      dispatch(clearUser()); // Redux 상태 초기화
      navigate("/"); // 홈으로 이동
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#1f2937] to-[#111827] py-12 text-center">
      <img
        src={user?.photoURL || "/user-avatar.svg"}
        alt="프로필 이미지"
        className="w-24 h-24 rounded-full mx-auto border-2 border-white mb-4"
      />
      <h1 className="text-2xl font-semibold">
        {user?.displayName || user?.email || "닉네임 없음"}
      </h1>
      <p className="text-sm text-gray-300 mb-4">
        {user?.isPremium ? "Premium Member" : "일반 회원"}
      </p>

      {/* 버튼 그룹 */}
      <div className="flex justify-center gap-4 flex-wrap">
        <button className="min-w-[100px] px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
          프로필 수정
        </button>
        <button className="min-w-[100px] px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
          설정
        </button>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`min-w-[100px] px-4 py-2 border border-white rounded transition ${
            isLoggingOut
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "text-red-500 hover:bg-red-500 hover:text-white"
          }`}
        >
          {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
        </button>
      </div>
    </div>
  );
}

ProfileSection.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};
