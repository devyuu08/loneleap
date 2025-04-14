// loneleap-admin/components/reports/ReportReviewItem.jsx
import ReviewPreviewCard from "./ReviewPreviewCard";
import ActionButtons from "./ActionButtons";
import { format } from "date-fns";

export default function ReportReviewItem({ report }) {
  const { reason, reporterId, reportedAt, review } = report;

  const formattedDate =
    reportedAt && reportedAt.toDate
      ? format(reportedAt.toDate(), "yyyy-MM-dd HH:mm")
      : "날짜 없음";

  return (
    <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
      <div className="text-sm text-gray-600 mb-1">
        신고자: <span className="font-medium">{reporterId}</span>
        <span className="mx-2">|</span>
        신고일: {formattedDate}
      </div>
      <div className="mb-3">
        신고 사유: <span className="font-semibold">{reason}</span>
      </div>

      {/* 리뷰 요약 카드 */}
      {review ? (
        <ReviewPreviewCard review={review} />
      ) : (
        <p className="text-red-500 font-medium mb-2">리뷰가 삭제되었습니다.</p>
      )}

      <ActionButtons report={report} />
    </div>
  );
}
