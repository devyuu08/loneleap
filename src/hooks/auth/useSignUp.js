import { useDispatch } from "react-redux";

import { setUser } from "@/store/userSlice";
import { signUpUser } from "@/services/auth/signUpUser";
import { useMutationWithFeedback } from "@/hooks/common/useMutationWithFeedback";

// 회원가입 로직을 처리하는 커스텀 훅
export function useSignUp() {
  const dispatch = useDispatch();

  const mutation = useMutationWithFeedback({
    // 실제 회원가입 실행 함수
    mutationFn: async ({ email, password, passwordConfirm, nickname }) => {
      // 입력값 정리
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      const trimmedPasswordConfirm = passwordConfirm.trim();
      const trimmedNickname = nickname.trim();

      // 이메일 유효성 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        throw new Error("유효한 이메일 주소를 입력해주세요.");
      }

      // 닉네임 유효성 검사
      if (!trimmedNickname || trimmedNickname.length > 20) {
        throw new Error("닉네임은 1~20자로 입력해주세요.");
      }

      // 비밀번호 유효성 검사
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(trimmedPassword)) {
        throw new Error(
          "비밀번호는 최소 8자 이상이며, 대소문자, 숫자, 특수문자를 포함해야 합니다."
        );
      }

      // 비밀번호 일치 여부 확인
      if (trimmedPassword !== trimmedPasswordConfirm) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }

      // 회원가입 요청
      return await signUpUser(trimmedEmail, trimmedPassword, trimmedNickname);
    },
    // 공통 옵션
    successMessage: "회원가입이 완료되었습니다!",
    errorMessage: "회원가입에 실패했습니다.",
    redirectTo: "/",

    // 성공 시 Redux 상태 업데이트
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
