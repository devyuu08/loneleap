import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "store/userSlice";
import { signUp } from "services/auth";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(""); // Added state for password confirmation
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // 클라이언트 측 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요.");
      return;
    }

    const trimmedNickname = nickname.trim();
    if (trimmedNickname.length > 20) {
      setError("닉네임은 20자 이하로 입력해주세요.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(trimmedPassword)) {
      setError(
        "비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      return;
    }

    // 비밀번호 확인 일치 검사
    const trimmedPasswordConfirm = passwordConfirm.trim();
    if (trimmedPassword !== trimmedPasswordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await signUp(
        trimmedEmail,
        trimmedPassword,
        nickname.trim()
      );
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
      if (err.code === "auth/email-already-in-use") {
        setError("이미 사용 중인 이메일입니다.");
      } else if (err.code === "auth/weak-password") {
        +setError(
          "비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
        );
      } else {
        setError("회원가입에 실패했습니다.");
        console.error("회원가입 오류:", err.code, err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/auth-bg.jpg')` }}
        aria-hidden="true"
      />

      {/* 오버레이 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-20"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen py-32 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/50 w-full max-w-sm p-8 rounded-xl shadow-sm border backdrop-blur-md">
          <div className="text-center mb-8">
            <h1 className="text-xl font-semibold text-gray-800">LONELEAP</h1>
            <p className="mt-1 text-sm text-gray-500">
              혼자 떠나는 여정, 스스로를 향한 도약
            </p>
          </div>

          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}

          <form className="space-y-5" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="nickname" className="block text-sm font-medium">
                닉네임
              </label>
              <input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력하세요"
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium">
                비밀번호
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500 hover:underline"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPassword ? "숨기기" : "보기"}
              </button>
            </div>

            <div className="relative">
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium"
              >
                비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                type={showPasswordConfirm ? "text" : "password"}
                className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500 hover:underline"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                aria-label={
                  showPasswordConfirm
                    ? "비밀번호 확인 숨기기"
                    : "비밀번호 확인 보기"
                }
              >
                {showPasswordConfirm ? "숨기기" : "보기"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#6D8591] text-white rounded-md hover:bg-[#4d5e66] transition"
            >
              {loading ? "가입 중..." : "가입하기"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
