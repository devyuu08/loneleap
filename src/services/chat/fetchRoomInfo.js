import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 채팅방의 기본 정보를 가져옴
 * @param {string} roomId - 채팅방 ID
 * @returns {Promise<Object>} - 채팅방 데이터
 * @throws {Error} - 존재하지 않는 채팅방일 경우
 */

export async function fetchRoomInfo(roomId) {
  const docRef = doc(db, "chatRooms", roomId);
  const roomDoc = await getDoc(docRef);
  if (!roomDoc.exists()) {
    throw new Error("채팅방 정보가 없습니다.");
  }
  return roomDoc.data();
}
