import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/store/userSlice";

import { signIn, signInWithGoogle } from "@/services/auth/auth";
import { useMutation } from "@tanstack/react-query";

// 로그인 관련 로직을 캡슐화한 커스텀 훅
export function useLogin() {
  // 사용자 입력 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 전역 상태 관리 및 페이지 이동
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 이메일/비밀번호 로그인
  const {
    mutate: handleEmailPasswordLogin, // 로그인 실행 함수
    isPending: isEmailLoading, // 로딩 상태
    error: emailError, // 에러 객체
  } = useMutation({
    mutationFn: () => signIn(email, password), // 로그인 API 요청
    onSuccess: (result) => {
      const user = result.user;

      // 로그인 성공 시 Redux에 사용자 정보 저장
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
      // 홈으로 리디렉션
      navigate("/");
    },
    onError: (err) => {
      console.error("이메일 로그인 실패:", err.message);
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
    },
    retry: 0, // 실패 시 재시도하지 않음
  });

  // 구글 로그인
  const { mutate: handleGoogleLogin, isPending: isGoogleLoading } = useMutation(
    {
      mutationFn: signInWithGoogle,
      onSuccess: (result) => {
        const user = result.user;

        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        navigate("/");
      },
      onError: (err) => {
        console.error("Google 로그인 실패:", err.message);
        alert("Google 로그인 중 오류가 발생했습니다.");
      },
      retry: 1, // 최대 1회 재시도
    }
  );

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleEmailPasswordLogin,
    handleGoogleLogin,
    isEmailLoading,
    isGoogleLoading,
    emailError,
  };
}
