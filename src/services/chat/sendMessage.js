import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 채팅 메시지를 전송
 * @param {Object} params
 * @param {string} params.roomId - 채팅방 ID
 * @param {string} params.message - 메시지 본문
 * @param {Object} params.user - 전송자 정보
 * @returns {Promise<DocumentReference>} - 생성된 메시지 문서 참조
 * @throws {Error} - 필수 값 누락 시
 */

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
