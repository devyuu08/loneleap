import {
  doc,
  getDoc,
  addDoc,
  updateDoc,
  serverTimestamp,
  increment,
  collection,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { checkDuplicateReport } from "@/services/chat/checkDuplicateReport";

export async function reportMessage({ messageId, roomId, reason, user }) {
  if (!user) throw new Error("로그인 정보가 없습니다");
  if (!messageId || messageId.length < 10)
    throw new Error("유효하지 않은 메시지 ID 형식입니다");
  if (!roomId || roomId.length < 10)
    throw new Error("유효하지 않은 채팅방 ID 형식입니다");
  if (!reason.trim()) throw new Error("신고 사유를 입력해주세요");
  if (reason.length > 500)
    throw new Error("신고 사유는 500자 이내로 작성해주세요");

  const alreadyReported = await checkDuplicateReport(messageId, user.uid);
  if (alreadyReported) {
    throw new Error("이미 신고한 메시지입니다.");
  }

  const messageRef = doc(db, "chatMessages", messageId);
  const messageSnap = await getDoc(messageRef);

  if (!messageSnap.exists()) {
    throw new Error("신고 대상 메시지를 찾을 수 없습니다.");
  }

  const { sender } = messageSnap.data();

  if (!sender?.uid) {
    throw new Error("신고 대상 사용자 정보를 찾을 수 없습니다.");
  }

  await addDoc(collection(db, "chatReports"), {
    messageId,
    roomId,
    reporterId: user.uid,
    reason,
    reportedAt: serverTimestamp(),
  });

  await updateDoc(doc(db, "users_private", sender.uid), {
    reportedCount: increment(1),
  });
}
