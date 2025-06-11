import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { deleteComment } from "@/services/review/deleteComment";

/**
 * useDeleteComment
 * - 댓글 삭제 기능을 제공하는 mutation 훅
 * - Optimistic update 방식으로 UI 반영 → 실패 시 롤백
 * - 삭제 후 댓글 쿼리 무효화
 */

export function useDeleteComment(reviewId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => deleteComment({ reviewId, commentId }),

    onMutate: async (commentId) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.COMMENTS(reviewId),
      });

      const prevComments = queryClient.getQueryData(
        QUERY_KEYS.COMMENTS(reviewId)
      );

      queryClient.setQueryData(QUERY_KEYS.COMMENTS(reviewId), (old) =>
        old?.filter((comment) => comment.id !== commentId)
      );

      return { prevComments };
    },

    onError: (err, commentId, context) => {
      if (context?.prevComments) {
        queryClient.setQueryData(
          QUERY_KEYS.COMMENTS(reviewId),
          context.prevComments
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMENTS(reviewId),
      });
    },
  });
}
