import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "store/userSlice";
import { signUpUser } from "services/auth/signUpUser";

export function useSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowPasswordConfirm = () =>
    setShowPasswordConfirm((prev) => !prev);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedPasswordConfirm = passwordConfirm.trim();
    const trimmedNickname = nickname.trim();

    // 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!trimmedNickname) {
      setError("닉네임을 입력해주세요.");
      return;
    }

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
    if (trimmedPassword !== trimmedPasswordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await signUpUser(
        trimmedEmail,
        trimmedPassword,
        trimmedNickname
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

  return {
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
  };
}
