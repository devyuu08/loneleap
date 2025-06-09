import { useSelector } from "react-redux";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useMutationWithFeedback } from "@/hooks/common/useMutationWithFeedback";
import { addComment } from "@/services/review/addComment";

/**
 * useAddComment
 * - 특정 리뷰에 댓글을 등록하는 mutation 훅
 * - 로그인 유저만 등록 가능, 작성 후 댓글 쿼리 무효화
 */

export function useAddComment(reviewId) {
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
}
