// src/components/mypage/ProfileSection.jsx
import React from "react";

export default function ProfileSection({ user }) {
  return (
    <div className="bg-gradient-to-b from-[#1f2937] to-[#111827] py-12 text-center">
      <img
        src="/user-avatar.svg" // 이미지 경로에 맞게 수정
        alt="프로필 이미지"
        className="w-24 h-24 rounded-full mx-auto border-2 border-white mb-4"
      />
      <h1 className="text-2xl font-semibold">
        {user?.displayName || "닉네임"}
      </h1>
      <p className="text-sm text-gray-300 mb-4">Premium Member</p>
      <div className="flex justify-center gap-4">
        <button className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
          프로필 수정
        </button>
        <button className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
          설정
        </button>
      </div>
    </div>
  );
}
