import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "services/firebase";

export const useDeleteComment = (reviewId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId) => {
      const commentDoc = doc(db, "reviews", reviewId, "comments", commentId);
      await deleteDoc(commentDoc);
    },
    // Optimistic Update
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ["comments", reviewId] });

      const prevComments = queryClient.getQueryData(["comments", reviewId]);

      queryClient.setQueryData(["comments", reviewId], (old) =>
        old?.filter((comment) => comment.id !== commentId)
      );

      return { prevComments };
    },

    // 실패 시 롤백
    onError: (err, commentId, context) => {
      if (context?.prevComments) {
        queryClient.setQueryData(["comments", reviewId], context.prevComments);
      }
    },

    // 성공 시 re-fetch로 동기화
    onSettled: () => {
      queryClient.invalidateQueries(["comments", reviewId]);
    },
  });
};
