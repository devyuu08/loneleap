// loneleap-admin/pages/api/reviewReports/getReviewReports.js
import { db } from "@/lib/firebaseAdmin";
import { verifyAdminToken } from "@/lib/auth"; // 인증 미들웨어 가정

export default async function handler(req, res) {
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
    const limit = 50; // 적절한 제한 설정
    const snapshot = await db
      .collection("review_reports")
      .orderBy("reportedAt", "desc") // 생성 시간 기준 정렬 (필드명 확인 필요)
      .limit(limit)
      .get();

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
