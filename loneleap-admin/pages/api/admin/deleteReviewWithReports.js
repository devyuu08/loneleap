// loneleap-admin/pages/api/admin/deleteReviewWithReports.js

import { db } from "@/lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "허용되지 않은 요청 방식입니다." });
  }

  const { reviewId } = req.body;

  if (!reviewId) {
    return res.status(400).json({ error: "리뷰 ID가 없습니다." });
  }

  try {
    // 1. 리뷰 삭제
    await db.collection("reviews").doc(reviewId).delete();

    // 2. 신고 삭제
    const reportsRef = db
      .collection("review_reports")
      .where("reviewId", "==", reviewId);
    const snapshot = await reportsRef.get();

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    return res.status(200).json({ message: "리뷰 및 신고 삭제 완료" });
  } catch (err) {
    console.error("리뷰 삭제 오류:", err);
    return res.status(500).json({ error: "서버 오류로 삭제 실패" });
  }
}
