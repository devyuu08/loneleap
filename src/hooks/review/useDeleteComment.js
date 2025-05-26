import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "services/firebase";
import { QUERY_KEYS } from "constants/queryKeys";

export const useDeleteComment = (reviewId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId) => {
      const commentDoc = doc(db, "reviews", reviewId, "comments", commentId);
      await deleteDoc(commentDoc);
    },
    // Optimistic Update
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

    // 실패 시 롤백
    onError: (err, commentId, context) => {
      if (context?.prevComments) {
        queryClient.setQueryData(
          QUERY_KEYS.COMMENTS(reviewId),
          context.prevComments
        );
      }
    },

    // 성공 시 re-fetch로 동기화
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMENTS(reviewId),
      });
    },
  });
};
