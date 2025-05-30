import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

export const addComment = async ({ reviewId, content, user }) => {
  const commentRef = collection(db, "reviews", reviewId, "comments");
  await addDoc(commentRef, {
    content,
    author: {
      uid: user.uid,
      displayName: user.displayName || "익명",
      photoURL: user.photoURL || "",
    },
    authorUid: user.uid,
    createdAt: serverTimestamp(),
  });
};
