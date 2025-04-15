// loneleap-admin/pages/api/chatReports/getChatReports.js
import { db } from "@/lib/firebaseAdmin";
import { verifyAdminToken } from "@/lib/auth";

export default async function getChatReports(req, res) {
  // 관리자 인증
  try {
    await verifyAdminToken(req, res);
  } catch (error) {
    return res.status(401).json({ error: "인증되지 않은 요청입니다." });
  }

  // 허용된 메서드 확인
  if (req.method !== "GET") {
    return res.status(405).json({ error: "허용되지 않은 요청 방식입니다." });
  }

  try {
    const limit = parseInt(req.query.limit) || 50;
    const lastDocId = req.query.lastDocId || null;

    let queryRef = db
      .collection("chatReports")
      .orderBy("reportedAt", "desc")
      .limit(limit);

    if (lastDocId) {
      const lastDocSnap = await db
        .collection("chatReports")
        .doc(lastDocId)
        .get();
      if (lastDocSnap.exists) {
        queryRef = queryRef.startAfter(lastDocSnap);
      }
    }

    const snapshot = await queryRef.get();

    const data = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const report = docSnap.data();
        const { roomId, messageId } = report;

        // 메시지 원문 가져오기
        let messageText = "(메시지를 찾을 수 없습니다)";
        try {
          const messageSnap = await db
            .collection("chatRooms")
            .doc(roomId)
            .collection("messages")
            .doc(messageId)
            .get();

          if (messageSnap.exists) {
            messageText = messageSnap.data().text || "(빈 메시지)";
          }
        } catch (error) {
          console.warn("메시지 조회 실패:", error);
        }

        return {
          id: docSnap.id, // 신고 문서 ID
          ...report,
          reportedAt: report.reportedAt?.toDate?.().toISOString() || null, // ISO 변환
          messageText,
        };
      })
    );

    return res.status(200).json(data);
  } catch (error) {
    console.error("채팅 신고 데이터 불러오기 오류:", error);
    return res.status(500).json({
      error: "채팅 신고 데이터를 불러오는 중 서버 오류가 발생했습니다",
      message: error.message,
    });
  }
}
