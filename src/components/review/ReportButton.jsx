import { useState } from "react";
import PropTypes from "prop-types";
import { useReportReview } from "hooks/review/useReportReview";
import ReportModal from "components/common/ReportModal";
import ModalPortal from "components/common/ModalPortal";

export default function ReportButton({ reviewId }) {
  const [isOpen, setIsOpen] = useState(false);
  const reportMutation = useReportReview();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = ({ reason }) => {
    return reportMutation
      .mutateAsync({ reviewId, reason })
      .then(() => {
        alert("신고가 접수되었습니다.");
        setIsOpen(false);
      })
      .catch((err) => {
        alert(err?.message || "신고 처리 중 오류가 발생했습니다.");
      });
  };

  return (
    <>
      <button
        onClick={handleOpen}
        disabled={reportMutation.isPending}
        className="px-3 py-1.5 rounded-full border border-gray-300 text-sm bg-white/60 text-gray-800 backdrop-blur-sm shadow-sm hover:bg-white/80 transition disabled:opacity-50"
      >
        {reportMutation.isPending ? "신고 중..." : "신고하기"}
      </button>

      {isOpen && (
        <ModalPortal>
          <ReportModal
            onClose={handleClose}
            onSubmit={handleSubmit}
            isPending={reportMutation.isPending}
          />
        </ModalPortal>
      )}
    </>
  );
}

ReportButton.propTypes = {
  reviewId: PropTypes.string.isRequired,
};
