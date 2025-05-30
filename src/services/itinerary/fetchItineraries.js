import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/services/firebase";

export async function fetchItineraries(limitCount = 20) {
  const q = query(
    collection(db, "itineraries"),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      createdBy: {
        uid: data.createdBy?.uid || "",
        displayName: data.createdBy?.displayName || "익명",
        photoURL: data.createdBy?.photoURL || "/images/default-profile.png",
      },
    };
  });
}
