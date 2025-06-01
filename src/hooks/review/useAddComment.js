import { useSelector } from "react-redux";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useMutationWithFeedback } from "@/hooks/common/useMutationWithFeedback";
import { addComment } from "@/services/review/addComment";

export const useAddComment = (reviewId) => {
  const user = useSelector((state) => state.user.user);

  const checkAuth = () => {
    if (!user) throw new Error("로그인이 필요합니다.");
  };

  return useMutationWithFeedback({
    mutationFn: async ({ content }) => {
      checkAuth();
      return await addComment({ reviewId, content, user });
    },
    successMessage: "댓글이 등록되었습니다.",
    errorMessage: "댓글 등록 중 오류가 발생했습니다.",
    queryKeysToInvalidate: [[QUERY_KEYS.COMMENTS(reviewId)]],
  });
};
