import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { db } from "services/firebase";

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
    console.error("채팅방 참여자 등록 실패:", err);
  }
}
