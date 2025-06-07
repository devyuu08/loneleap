import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 리뷰에 댓글을 추가
 * @param {Object} params - 댓글 정보
 * @param {string} params.reviewId - 댓글을 달 리뷰의 ID
 * @param {string} params.content - 댓글 내용
 * @param {Object} params.user - 댓글 작성자 정보
 * @returns {Promise<void>}
 */

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
