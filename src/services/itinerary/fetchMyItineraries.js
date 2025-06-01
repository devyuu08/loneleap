import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/services/firebase";

export async function fetchMyItineraries(uid) {
  if (!uid) throw new Error("사용자 정보가 없습니다.");

  const q = query(
    collection(db, "itineraries"),
    where("userId", "==", uid),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };
  });
}
