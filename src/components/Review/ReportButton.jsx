// src/components/Review/ReportButton.jsx

import PropTypes from "prop-types";
import { useReportReview } from "services/queries/useReportReview";

export default function ReportButton({ reviewId }) {
  const reportMutation = useReportReview();

  const handleReport = () => {
    const reason = prompt("신고 사유를 입력해주세요:");
    if (!reason) return;

    reportMutation.mutate({ reviewId, reason });
  };

  return (
    <button
      onClick={handleReport}
      disabled={reportMutation.isLoading}
      className="text-sm text-red-500 hover:underline disabled:opacity-50"
    >
      {reportMutation.isLoading ? "신고 중..." : "신고하기"}
    </button>
  );
}

ReportButton.propTypes = {
  reviewId: PropTypes.string.isRequired,
};
