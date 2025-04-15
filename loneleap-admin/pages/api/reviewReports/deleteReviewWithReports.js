// loneleap-admin/pages/api/reviewReports/deleteReviewWithReports.js

import { db } from "@/lib/firebaseAdmin";
import { verifyAdminSession } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "허용되지 않은 요청 방식입니다." });
  }

  // 관리자 인증 확인
  try {
    await verifyAdminSession(req);
  } catch (error) {
    return res.status(401).json({ error: "관리자 권한이 필요합니다." });
  }

  const { reviewId } = req.body;

  if (!reviewId) {
    return res.status(400).json({ error: "리뷰 ID가 없습니다." });
  }

  try {
    const reportsRef = db
      .collection("review_reports")
      .where("reviewId", "==", reviewId);
    const snapshot = await reportsRef.get();

    // 트랜잭션으로 리뷰와 신고를 원자적으로 삭제
    +(await db.runTransaction(async (transaction) => {
      // 1. 리뷰 삭제
      transaction.delete(db.collection("reviews").doc(reviewId));

      // 2. 신고 삭제
      snapshot.docs.forEach((doc) => {
        transaction.delete(doc.ref);
      });
    }));

    return res.status(200).json({ message: "리뷰 및 신고 삭제 완료" });
  } catch (err) {
    console.error("리뷰 삭제 오류:", err);
    // 오류 유형에 따른 메시지 제공
    if (err.code === "not-found") {
      return res
        .status(404)
        .json({ error: "삭제할 리뷰 또는 신고를 찾을 수 없습니다." });
    } else if (err.code === "permission-denied") {
      return res.status(403).json({ error: "리뷰 삭제 권한이 없습니다." });
    } else {
      return res
        .status(500)
        .json({ error: "서버 오류로 삭제 실패", details: err.message });
    }
  }
}
