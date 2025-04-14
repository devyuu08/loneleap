// loneleap-admin/pages/api/admin/getReviewReports.js
import { db } from "@/lib/firebaseAdmin";

export default async function handler(req, res) {
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
          review: reviewSnap.exists ? reviewSnap.data() : null,
        };
      })
    );

    res.status(200).json(data);
  } catch (error) {
    console.error("리뷰 신고 데이터 불러오기 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
}
