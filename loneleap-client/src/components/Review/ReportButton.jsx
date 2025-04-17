// src/components/Review/ReportButton.jsx

import { useState } from "react";
import PropTypes from "prop-types";
import { useReportReview } from "services/queries/useReportReview";
import ReportModal from "components/ReportModal"; // 경로는 너 구조에 따라 조정

export default function ReportButton({ reviewId }) {
  const [isOpen, setIsOpen] = useState(false);
  const reportMutation = useReportReview();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = ({ reason }) => {
    return reportMutation.mutateAsync({ reviewId, reason }).then(handleClose);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        disabled={reportMutation.isPending}
        className="text-sm text-red-500 hover:underline disabled:opacity-50"
      >
        {reportMutation.isPending ? "신고 중..." : "신고하기"}
      </button>

      {isOpen && (
        <ReportModal
          onClose={handleClose}
          onSubmit={handleSubmit}
          isPending={reportMutation.isPending}
        />
      )}
    </>
  );
}

ReportButton.propTypes = {
  reviewId: PropTypes.string.isRequired,
};
