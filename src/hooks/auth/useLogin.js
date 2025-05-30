import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/store/userSlice";

import { signIn, signInWithGoogle } from "@/services/auth/auth";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    mutate: handleEmailPasswordLogin,
    isPending: isEmailLoading,
    error: emailError,
  } = useMutation({
    mutationFn: () => signIn(email, password),
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
      console.error("이메일 로그인 실패:", err.message);
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
    },
  });

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
