import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 사용자를 채팅방에 참여시키고 시스템 메시지를 추가
 * @param {Object} params
 * @param {string} params.roomId - 채팅방 ID
 * @param {Object} params.user - 사용자 정보 객체
 */

export async function joinRoom({ roomId, user }) {
  try {
    const roomRef = doc(db, "chatRooms", roomId);
    const roomSnap = await getDoc(roomRef);
    const roomData = roomSnap.data();

    const alreadyIn = roomData?.participants?.includes(user.uid);

    if (!alreadyIn) {
      await updateDoc(roomRef, {
        participants: arrayUnion(user.uid),
      });

      await addDoc(collection(db, "chatMessages"), {
        type: "system",
        systemType: "join",
        userId: user.uid,
        userName: user.displayName || "익명",
        roomId,
        createdAt: serverTimestamp(),
      });
    }
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("채팅방 참여자 등록 실패:", err);
    }
    throw err; // 호출부에서 catch하도록 예외 전달
  }
}
