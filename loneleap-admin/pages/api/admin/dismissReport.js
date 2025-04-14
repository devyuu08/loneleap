// loneleap-admin/pages/api/admin/dismissReport.js
import { db } from "@/lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "허용되지 않은 요청 방식입니다." });
  }

  const { reportId } = req.body;

  if (!reportId) {
    return res.status(400).json({ error: "신고 ID가 없습니다." });
  }

  try {
    await db.collection("review_reports").doc(reportId).delete();
    return res.status(200).json({ message: "신고 삭제 완료" });
  } catch (err) {
    console.error("신고 삭제 오류:", err);
    return res.status(500).json({ error: "서버 오류로 삭제 실패" });
  }
}
