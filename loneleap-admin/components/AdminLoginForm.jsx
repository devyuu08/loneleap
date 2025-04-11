import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock } from "react-icons/fi";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleAdminLogin = async () => {
    setLoading(true);
    setError("");
    setPasswordMatchError("");

    // 비밀번호 확인 검사
    if (password !== confirmPassword) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      const code = err?.code || "";
      switch (code) {
        case "auth/user-not-found":
          setError("해당 계정이 존재하지 않습니다.");
          break;
        case "auth/wrong-password":
          setError("비밀번호가 올바르지 않습니다.");
          break;
        case "auth/invalid-email":
          setError("올바른 이메일 형식이 아닙니다.");
          break;
        case "auth/invalid-credential":
          setError("입력하신 계정 정보가 올바르지 않습니다.");
          break;
        default:
          setError("로그인 중 오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Google 로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <div className="text-3xl">🔐</div>
        <h2 className="text-xl font-bold mt-2">관리자 로그인</h2>
        <p className="text-sm text-gray-500 mt-1">
          리뷰와 오픈채팅, LoneLeap의 소중한 공간을 지켜주세요.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="email"
            placeholder="이메일"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>

        <button
          onClick={handleAdminLogin}
          disabled={loading}
          className="w-full h-11 bg-gray-900 text-white py-2 rounded-md font-semibold hover:bg-gray-800 flex items-center justify-center"
        >
          {loading ? <LoadingSpinner /> : "로그인"}
        </button>

        <div className="text-center text-sm text-gray-400">또는</div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-50"
        >
          <FcGoogle className="text-xl" />
          Google 계정으로 로그인
        </button>
      </div>

      {passwordMatchError && <ErrorMessage message={passwordMatchError} />}
      {error && <ErrorMessage message={error} />}

      <div className="mt-6 text-center text-sm text-gray-400">
        비밀번호를 잊으셨나요?
      </div>
    </div>
  );
}
