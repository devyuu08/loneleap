// src/components/AuthForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice";

import { signIn } from "../services/auth";
import { signInWithGoogle } from "../services/auth";

export default function AuthForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // 에러 초기화
    try {
      const result = await signIn(email, password);
      dispatch(
        setUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        })
      );
      navigate("/");
    } catch (err) {
      console.error("이메일 로그인 실패:", err.message);
      setError("이메일 또는 비밀번호가 잘못되었습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      dispatch(
        setUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        })
      );
      navigate("/");
    } catch (err) {
      console.error("Google 로그인 실패:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold tracking-wide">LONELEAP</h1>
          <p className="text-sm text-gray-500 mt-2">
            혼자 떠나는 여정, 스스로를 향한 도약
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleEmailPasswordLogin}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded font-medium hover:bg-black"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="h-px flex-1 bg-gray-300" />
            또는
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 rounded py-2 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <span className="text-xl">G</span> Google로 계속하기
          </button>

          <button
            type="button"
            onClick={() => alert("Naver 로그인은 다음 버전에서 지원됩니다.")}
            className="w-full border border-gray-300 rounded py-2 flex items-center justify-center gap-2 hover:bg-green-50"
          >
            <img src="/naver-btn.png" alt="Naver" className="w-5 h-5" />
            네이버로 계속하기
          </button>

          {/* <button
            type="button"
            className="w-full border border-gray-300 rounded py-2 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <span className="text-xl"></span> Apple로 계속하기
          </button> */}
        </form>

        <div className="flex justify-between mt-6 text-sm text-gray-500">
          <Link to="/reset">비밀번호를 잊으셨나요?</Link>
          <Link to="/signup">회원가입</Link>
        </div>

        <footer className="text-xs text-center text-gray-400 mt-10">
          © 2025 LONELEAP. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
