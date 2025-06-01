import { useDispatch } from "react-redux";
import { useUser } from "@/hooks/auth/useUser";
import { useMutationWithFeedback } from "@/hooks/common/useMutationWithFeedback";
import { updateUserProfileAll } from "@/services/mypage/updateUserProfileAll";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useUpdateProfile = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const dispatch = useDispatch();

  return useMutationWithFeedback({
    mutationFn: async ({ displayName, photoURL, bio }) => {
      if (isUserLoading || !user) throw new Error("로그인이 필요합니다.");

      await updateUserProfileAll({
        uid: user.uid,
        displayName,
        photoURL,
        bio,
        dispatch,
        user,
      });
    },
    successMessage: "프로필이 성공적으로 업데이트되었습니다.",
    errorMessage: "프로필 업데이트 중 오류가 발생했습니다.",
    queryKeysToInvalidate: [
      [QUERY_KEYS.REVIEWS],
      [QUERY_KEYS.ITINERARIES],
      [QUERY_KEYS.CHAT_ROOMS],
    ],
  });
};
