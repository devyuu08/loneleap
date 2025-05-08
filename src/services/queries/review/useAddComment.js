import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import { db } from "services/firebase";

export const useAddComment = (reviewId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, authorId, authorName }) => {
      const commentRef = collection(db, "reviews", reviewId, "comments");
      await addDoc(commentRef, {
        content,
        authorId,
        authorName,
        createdAt: serverTimestamp(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", reviewId]);
    },
  });
};
