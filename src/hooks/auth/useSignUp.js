import { useDispatch } from "react-redux";

import { setUser } from "@/store/userSlice";
import { signUpUser } from "@/services/auth/signUpUser";
import { useMutationWithFeedback } from "@/hooks/common/useMutationWithFeedback";

export function useSignUp() {
  const dispatch = useDispatch();

  const mutation = useMutationWithFeedback({
    mutationFn: async ({ email, password, passwordConfirm, nickname }) => {
      // 유효성 검사
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      const trimmedPasswordConfirm = passwordConfirm.trim();
      const trimmedNickname = nickname.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        throw new Error("유효한 이메일 주소를 입력해주세요.");
      }

      if (!trimmedNickname || trimmedNickname.length > 20) {
        throw new Error("닉네임은 1~20자로 입력해주세요.");
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(trimmedPassword)) {
        throw new Error(
          "비밀번호는 최소 8자 이상이며, 대소문자, 숫자, 특수문자를 포함해야 합니다."
        );
      }

      if (trimmedPassword !== trimmedPasswordConfirm) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }

      return await signUpUser(trimmedEmail, trimmedPassword, trimmedNickname);
    },
    successMessage: "회원가입이 완료되었습니다!",
    errorMessage: "회원가입에 실패했습니다.",
    redirectTo: "/",

    onSuccessCallback: ({ user }) => {
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
    },

    mutationOptions: {
      retry: 0,
    },
  });

  return mutation;
}
