import { useLogin } from "@/hooks/auth/useLogin";
import LoginForm from "@/components/auth/LoginForm";

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
  } = useLogin();

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
