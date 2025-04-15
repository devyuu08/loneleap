// loneleap-admin/pages/api/chatReports/deleteMessageWithReports.js

import { db } from "@/lib/firebaseAdmin";
import { verifyAdminSession } from "@/lib/auth";

export default async function deleteMessageWithReports(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "허용되지 않은 요청 방식입니다." });
  }

  // 관리자 인증
  try {
    await verifyAdminSession(req);
  } catch (error) {
    return res.status(401).json({ error: "관리자 권한이 필요합니다." });
  }

  const { roomId, messageId } = req.body;

  if (!roomId || !messageId) {
    return res.status(400).json({ error: "roomId 또는 messageId가 없습니다." });
  }

  try {
    // 1. 관련된 모든 신고 문서 찾기
    const reportsRef = db
      .collection("chatReports")
      .where("roomId", "==", roomId)
      .where("messageId", "==", messageId);

    const snapshot = await reportsRef.get();

    // 2. 트랜잭션으로 메시지 + 신고 일괄 삭제
    await db.runTransaction(async (transaction) => {
      // 메시지 삭제
      const messageRef = db
        .collection("chatRooms")
        .doc(roomId)
        .collection("messages")
        .doc(messageId);

      transaction.delete(messageRef);

      // 관련 신고 삭제
      snapshot.docs.forEach((doc) => {
        transaction.delete(doc.ref);
      });
    });

    return res.status(200).json({ message: "메시지 및 관련 신고 삭제 완료" });
  } catch (err) {
    console.error("채팅 메시지 삭제 오류:", err);

    if (err.code === "not-found") {
      return res
        .status(404)
        .json({ error: "삭제할 메시지 또는 신고가 없습니다." });
    } else if (err.code === "permission-denied") {
      return res.status(403).json({ error: "삭제 권한이 없습니다." });
    } else {
      return res
        .status(500)
        .json({ error: "서버 오류로 삭제 실패", details: err.message });
    }
  }
}
