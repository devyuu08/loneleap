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
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", reviewId]);
    },
  });
};
