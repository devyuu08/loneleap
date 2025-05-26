import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "services/firebase";

export async function sendChatMessage({ roomId, message, user }) {
  if (!roomId || !user?.uid || !message.trim()) {
    throw new Error("메시지 전송에 필요한 정보가 부족합니다.");
  }

  return await addDoc(collection(db, "chatMessages"), {
    type: "text",
    roomId,
    message: message.trim(),
    sender: {
      uid: user.uid,
      displayName: user.displayName || "익명",
      photoURL: user.photoURL || "",
    },
    createdAt: serverTimestamp(),
  });
}
