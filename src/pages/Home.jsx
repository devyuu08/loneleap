// src/pages/Home.jsx
import React from "react";

import { useSelector } from "react-redux";

export default function Home() {
  const { user, isLoading } = useSelector((state) => state.user); // 실제 구조: userSlice 내부의 user

  if (isLoading) {
    return <div className="p-6">로딩 중...</div>; // or Skeleton UI
  }

  const isLoggedIn = !!user; // null이 아니면 로그인 상태

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">LoneLeap 메인 페이지</h1>
      {isLoggedIn ? (
        <div>
          <p className="mt-4 text-green-600">환영합니다, {user.email}님!</p>
          <p>로그인 상태입니다. 모든 기능을 이용하실 수 있습니다.</p>
        </div>
      ) : (
        <div>
          <p className="mt-4 text-amber-600">로그인이 필요합니다.</p>
          <p>더 많은 기능을 이용하시려면 로그인해 주세요.</p>
        </div>
      )}
    </div>
  );
}
