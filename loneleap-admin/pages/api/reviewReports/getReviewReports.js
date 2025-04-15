// loneleap-admin/pages/api/reviewReports/getReviewReports.js
import { db } from "@/lib/firebaseAdmin";
import { verifyAdminToken } from "@/lib/auth"; // 인증 미들웨어 가정

export default async function getReviewReportsHandler(req, res) {
  // 관리자 권한 검증
  try {
    await verifyAdminToken(req, res);
  } catch (error) {
    return res.status(401).json({ error: "인증되지 않은 요청입니다." });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "허용되지 않은 요청 방식입니다." });
  }

  try {
    const parsedLimit = parseInt(req.query.limit);
    const limit = Number.isNaN(parsedLimit) ? 50 : parsedLimit;
    const lastDoc = req.query.lastDoc || null;

    let query = db
      .collection("review_reports")
      .orderBy("reportedAt", "desc")
      .limit(limit);

    // 페이지네이션을 위한 시작점 설정
    if (lastDoc) {
      const lastSnapshot = await db
        .collection("review_reports")
        .doc(lastDoc)
        .get();
      if (lastSnapshot.exists) {
        query = query.startAfter(lastSnapshot);
      }
    }

    const snapshot = await query.get();

    const data = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const report = docSnap.data();
        const reviewSnap = await db
          .collection("reviews")
          .doc(report.reviewId)
          .get();

        return {
          id: docSnap.id,
          ...report,
          reportedAt: report.reportedAt?.toDate?.().toISOString() || null, // 여기서 변환!
          review: reviewSnap.exists ? reviewSnap.data() : null,
        };
      })
    );

    res.status(200).json(data);
  } catch (error) {
    console.error("리뷰 신고 데이터 불러오기 오류:", error);
    res.status(500).json({
      error: "리뷰 신고 데이터를 불러오는 중 서버 오류가 발생했습니다",
      message: error.message,
    });
  }
}
