import { useState } from "react";
import { useSignUp } from "@/hooks/auth/useSignUp";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpFormContainer() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { mutate: handleSignUp, isPending, error } = useSignUp();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowPasswordConfirm = () =>
    setShowPasswordConfirm((prev) => !prev);

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
