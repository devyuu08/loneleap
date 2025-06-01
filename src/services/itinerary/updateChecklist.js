import { db } from "@/services/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export async function updateChecklist(itineraryId, checklist) {
  const docRef = doc(db, "itineraries", itineraryId);
  await updateDoc(docRef, {
    checklist,
    updatedAt: serverTimestamp(),
  });
}
