import {
  doc,
  updateDoc,
  arrayRemove,
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 사용자를 채팅방에서 퇴장시키고 시스템 메시지를 전송
 * @param {Object} params
 * @param {string} params.roomId - 채팅방 ID
 * @param {Object} params.user - 사용자 정보 객체
 */

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
