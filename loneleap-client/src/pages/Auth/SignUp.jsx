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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>

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
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
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
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
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
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500 hover:underline"
              onClick={() => setShowPassword(!showPassword)}
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
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-500 hover:underline"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            >
              {showPasswordConfirm ? "숨기기" : "보기"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded hover:bg-black"
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
  );
}
