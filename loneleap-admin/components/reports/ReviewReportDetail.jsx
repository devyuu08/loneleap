// loneleap-admin/components/reports/ReviewReportDetail.jsx

import { format } from "date-fns";
import ActionButtons from "../reports/ActionButtons";

export default function ReviewReportDetail({ report }) {
  if (!report) {
    return (
      <div
        className="p-6 text-sm text-gray-400 text-center"
        role="alert"
        aria-live="polite"
      >
        왼쪽 목록에서 신고된 리뷰를 선택하세요.
      </div>
    );
  }

  const { review, reason, reporterId, reportedAt } = report;

  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">리뷰 원문</h2>
        <p className="text-gray-800">
          {review?.content || "삭제된 리뷰입니다."}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">신고 사유</h2>
        <p className="text-gray-700">{reason}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">신고자</h2>
        <p className="text-gray-600">{reporterId}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">신고일자</h2>
        <p className="text-gray-500">
          {reportedAt?.toDate
            ? format(reportedAt.toDate(), "yyyy.MM.dd HH:mm")
            : "날짜 없음"}
        </p>
      </div>

      {/* 리뷰 삭제 / 신고 무시 버튼 */}
      <ActionButtons report={report} />
    </div>
  );
}
