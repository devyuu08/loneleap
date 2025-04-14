// loneleap-admin/components/reports/ReportReviewList.jsx
import EmptyState from "../common/EmptyState";
import ReportReviewItem from "./ReportReviewItem";

export default function ReportReviewList({ reports }) {
  if (!Array.isArray(reports)) {
    return (
      <p className="text-red-500 text-sm text-center py-4">
        불러온 데이터가 올바르지 않습니다.
      </p>
    );
  }

  if (reports.length === 0) {
    return <EmptyState message="신고된 리뷰가 없습니다." />;
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <ReportReviewItem key={report.id} report={report} />
      ))}
    </div>
  );
}
