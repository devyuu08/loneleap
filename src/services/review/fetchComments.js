import { db } from "@/services/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const fetchComments = async (reviewId) => {
  const commentsRef = collection(db, "reviews", reviewId, "comments");
  const q = query(commentsRef, orderBy("createdAt", "asc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
