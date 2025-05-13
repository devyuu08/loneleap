import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "services/firebase";

export const useAddComment = (reviewId) => {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.user.user);

  return useMutation({
    mutationFn: async ({ content }) => {
      if (!user) throw new Error("로그인이 필요합니다.");

      const commentRef = collection(db, "reviews", reviewId, "comments");
      await addDoc(commentRef, {
        content,
        author: {
          uid: user.uid,
          displayName: user.displayName || "익명",
          photoURL: user.photoURL || "",
        },
        createdAt: serverTimestamp(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", reviewId]);
    },
  });
};
