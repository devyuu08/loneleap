import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/store/userSlice";

import { signIn, signInWithGoogle } from "@/services/auth/auth";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    setIsEmailLoading(true);
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
      setIsEmailLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true); // 로딩 상태 시작
    setError(""); // 기존 에러 초기화
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
      setError("Google 로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsGoogleLoading(false); // 로딩 상태 종료
    }
  };

  return {
    email,
    password,
    error,
    isEmailLoading,
    isGoogleLoading,
    setEmail,
    setPassword,
    handleEmailPasswordLogin,
    handleGoogleLogin,
  };
}
