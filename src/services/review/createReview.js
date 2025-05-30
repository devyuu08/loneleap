import {
  updateDoc,
  doc,
  increment,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { uploadImage } from "@/utils/uploadImage";

export async function createReview(review, user) {
  const {
    title,
    destination,
    content,
    rating,
    image,
    type = "standard",
    interviewAnswers,
    interviewQuestions,
  } = review;

  if (!title?.trim()) throw new Error("제목을 입력해주세요.");
  if (!destination?.trim()) throw new Error("여행지명을 입력해주세요.");
  if (!rating) throw new Error("별점을 입력해주세요.");
  if (type === "standard" && (!content?.trim() || content.length < 100)) {
    throw new Error("내용을 100자 이상 입력해주세요.");
  }

  let imageUrl = "";
  if (image instanceof File) {
    imageUrl = await uploadImage(image, "reviews", user.uid);
  }

  const reviewData = {
    title,
    destination,
    rating,
    imageUrl,
    createdBy: {
      uid: user.uid,
      displayName: user.displayName || "익명",
      photoURL: user.photoURL || "",
    },
    createdAt: serverTimestamp(),
    likeCount: 0,
    commentCount: 0,
    type,
    ...(type === "standard"
      ? { content }
      : { interviewAnswers, interviewQuestions }),
  };

  const docRef = await addDoc(collection(db, "reviews"), reviewData);

  await updateDoc(doc(db, "users_private", user.uid), {
    reviewCount: increment(1),
  });

  return docRef.id;
}
