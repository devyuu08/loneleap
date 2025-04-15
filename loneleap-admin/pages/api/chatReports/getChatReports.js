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

  if (req.method !== "GET") {
    return res.status(405).json({ error: "허용되지 않은 요청 방식입니다." });
  }

  try {
    const limit = parseInt(req.query.limit) || 50;
    const lastDocId = req.query.lastDocId || null;

    let query = db
      .collection("chatReports")
      .orderBy("reportedAt", "desc")
      .limit(limit);

    if (lastDocId) {
      const lastDocSnap = await db
        .collection("chatReports")
        .doc(lastDocId)
        .get();
      if (lastDocSnap.exists) {
        query = query.startAfter(lastDocSnap);
      }
    }

    const snapshot = await query.get();

    // 1단계: 신고 데이터 배열 구성
    const reports = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      reportedAt: doc.data().reportedAt?.toDate?.().toISOString() || null,
    }));

    // 2단계: 메시지 참조 수집 (roomId -> [messageId, ...])
    const messageRefs = {};
    reports.forEach(({ roomId, messageId }) => {
      if (!messageRefs[roomId]) messageRefs[roomId] = [];
      messageRefs[roomId].push(messageId);
    });

    // 3단계: 메시지 일괄 조회 (roomId별 + where in)
    const messagesMap = {}; // roomId -> messageId -> messageText
    await Promise.all(
      Object.entries(messageRefs).map(async ([roomId, messageIds]) => {
        try {
          const uniqueIds = [...new Set(messageIds)];
          const CHUNK_SIZE = 10;
          for (let i = 0; i < uniqueIds.length; i += CHUNK_SIZE) {
            const chunk = uniqueIds.slice(i, i + CHUNK_SIZE);
            const snapshot = await db
              .collection("chatRooms")
              .doc(roomId)
              .collection("messages")
              .where("__name__", "in", chunk)
              .get();

            snapshot.forEach((doc) => {
              if (!messagesMap[roomId]) messagesMap[roomId] = {};
              messagesMap[roomId][doc.id] = doc.data().text || "(빈 메시지)";
            });
          }
        } catch (error) {
          console.error(`${roomId} 채팅 메시지 일괄 조회 실패:`, error);
        }
      })
    );

    // 4단계: 메시지 텍스트 추가
    const data = reports.map((report) => {
      const { roomId, messageId } = report;
      const messageText =
        messagesMap[roomId]?.[messageId] || "(메시지를 찾을 수 없습니다)";
      return {
        ...report,
        messageText,
      };
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error("채팅 신고 데이터 불러오기 오류:", error);
    return res.status(500).json({
      error: "채팅 신고 데이터를 불러오는 중 서버 오류가 발생했습니다",
      ...(process.env.NODE_ENV === "development" && {
        message: error.message,
        stack: error.stack,
      }),
    });
  }
}
