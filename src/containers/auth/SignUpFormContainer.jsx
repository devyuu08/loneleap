import { useState } from "react";
import { useSignUp } from "@/hooks/auth/useSignUp";
import SignUpForm from "@/components/auth/SignUpForm";

// 회원가입 폼의 상태와 로직을 관리하는 컨테이너 컴포넌트
// 프레젠테이션 컴포넌트(SignUpForm)로 상태와 핸들러를 전달
export default function SignUpFormContainer() {
  // 입력 상태 관리
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 비밀번호 보기 토글 상태
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 회원가입 API 호출 (React Query + 커스텀 훅 사용)
  const { mutate: handleSignUp, isPending, error } = useSignUp();

  // 토글 핸들러
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowPasswordConfirm = () =>
    setShowPasswordConfirm((prev) => !prev);

  // 폼 제출 시 회원가입 요청
  const onSubmit = (e) => {
    e.preventDefault();
    handleSignUp({
      email,
      nickname,
      password,
      passwordConfirm,
    });
  };

  return (
    <SignUpForm
      email={email}
      nickname={nickname}
      password={password}
      passwordConfirm={passwordConfirm}
      error={error?.message || ""}
      loading={isPending}
      showPassword={showPassword}
      showPasswordConfirm={showPasswordConfirm}
      onEmailChange={(e) => setEmail(e.target.value)}
      onNicknameChange={(e) => setNickname(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onPasswordConfirmChange={(e) => setPasswordConfirm(e.target.value)}
      onTogglePassword={toggleShowPassword}
      onTogglePasswordConfirm={toggleShowPasswordConfirm}
      onSubmit={onSubmit}
    />
  );
}
