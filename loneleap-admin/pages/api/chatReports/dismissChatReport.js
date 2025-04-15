// loneleap-admin/pages/api/chatReports/dismissChatReport.js

import { db } from "@/lib/firebaseAdmin";

export default async function dismissChatReport(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "허용되지 않은 요청 방식입니다." });
  }

  const { reportId } = req.body;

  if (!reportId) {
    return res.status(400).json({ error: "신고 ID가 없습니다." });
  }

  try {
    const docRef = db.collection("chatReports").doc(reportId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "해당 신고를 찾을 수 없습니다." });
    }

    // 감사 로그 추가
    await db.collection("adminLogs").add({
      action: "dismissChatReport",
      adminId: req.session?.user?.id, // 세션에서 관리자 ID 가져오기
      reportId: reportId,
      reportData: doc.data(), // 삭제 전 데이터 보존
      timestamp: new Date(),
    });

    await docRef.delete();

    return res.status(200).json({ message: "신고 삭제 완료" });
  } catch (err) {
    console.error("신고 삭제 오류:", err);
    return res.status(500).json({ error: "서버 오류로 삭제 실패" });
  }
}
