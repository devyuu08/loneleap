import { useSignUp } from "@/hooks/auth/useSignUp";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpFormContainer() {
  const {
    email,
    nickname,
    password,
    passwordConfirm,
    error,
    loading,
    showPassword,
    showPasswordConfirm,
    setEmail,
    setNickname,
    setPassword,
    setPasswordConfirm,
    toggleShowPassword,
    toggleShowPasswordConfirm,
    handleSignUp,
  } = useSignUp();

  return (
    <SignUpForm
      email={email}
      nickname={nickname}
      password={password}
      passwordConfirm={passwordConfirm}
      error={error}
      loading={loading}
      showPassword={showPassword}
      showPasswordConfirm={showPasswordConfirm}
      onEmailChange={(e) => setEmail(e.target.value)}
      onNicknameChange={(e) => setNickname(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onPasswordConfirmChange={(e) => setPasswordConfirm(e.target.value)}
      onTogglePassword={toggleShowPassword}
      onTogglePasswordConfirm={toggleShowPasswordConfirm}
      onSubmit={handleSignUp}
    />
  );
}
