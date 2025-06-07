import { useLogin } from "@/hooks/auth/useLogin";
import LoginForm from "@/components/auth/LoginForm";

// 로그인 폼의 상태와 로직을 관리하는 컨테이너 컴포넌트
// 프레젠테이션 컴포넌트(LoginForm)과 분리하여 관심사를 명확히 구분
export default function LoginFormContainer() {
  const {
    email,
    password,
    error,
    isEmailLoading,
    isGoogleLoading,
    setEmail,
    setPassword,
    handleEmailPasswordLogin,
    handleGoogleLogin,
  } = useLogin(); // 커스텀 훅을 통해 로그인 관련 상태 및 핸들러 제공

  return (
    <LoginForm
      email={email}
      password={password}
      error={error}
      isEmailLoading={isEmailLoading}
      isGoogleLoading={isGoogleLoading}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onSubmit={handleEmailPasswordLogin}
      onGoogleLogin={handleGoogleLogin}
    />
  );
}
