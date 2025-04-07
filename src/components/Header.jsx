// src/components/Header.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../services/auth";
import { clearUser } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Firebase 로그아웃 시도
      dispatch(clearUser()); // Redux 상태 초기화
      navigate("/"); // 홈으로 이동
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <header className="p-4 border-b flex justify-between">
      <Link to="/">LoneLeap</Link>
      {user ? (
        <div className="flex items-center gap-4">
          <span>{user.email}</span>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      )}
    </header>
  );
}
