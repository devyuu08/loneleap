import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

export const deleteComment = async ({ reviewId, commentId }) => {
  const commentDoc = doc(db, "reviews", reviewId, "comments", commentId);
  await deleteDoc(commentDoc);
};
