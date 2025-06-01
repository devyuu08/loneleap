import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

export async function fetchRoomInfo(roomId) {
  const docRef = doc(db, "chatRooms", roomId);
  const roomDoc = await getDoc(docRef);
  if (!roomDoc.exists()) {
    throw new Error("채팅방 정보가 없습니다.");
  }
  return roomDoc.data();
}
