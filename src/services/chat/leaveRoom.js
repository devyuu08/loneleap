import {
  doc,
  updateDoc,
  arrayRemove,
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { db } from "services/firebase";

export async function leaveRoom({ roomId, user }) {
  const roomRef = doc(db, "chatRooms", roomId);
  await updateDoc(roomRef, {
    participants: arrayRemove(user.uid),
  });

  // 퇴장 메시지 전송
  await addDoc(collection(db, "chatMessages"), {
    type: "system",
    systemType: "leave",
    userId: user.uid,
    userName: user.displayName || "익명",
    roomId,
    createdAt: serverTimestamp(),
  });
}
