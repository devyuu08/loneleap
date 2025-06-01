import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

export async function fetchRecommendationDetail(id) {
  const docRef = doc(db, "recommended_places", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) throw new Error("데이터 없음");
  return { id: snapshot.id, ...snapshot.data() };
}
