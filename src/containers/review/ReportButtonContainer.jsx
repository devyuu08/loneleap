import { useState } from "react";
import { useReportReview } from "hooks/review/useReportReview";
import ReportButton from "components/review/ReportButton";

export default function ReportButtonContainer({ reviewId }) {
  const [isOpen, setIsOpen] = useState(false);
  const reportMutation = useReportReview();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = async ({ reason }) => {
    try {
      await reportMutation.mutateAsync({ reviewId, reason });
      alert("신고가 접수되었습니다.");
      handleClose();
    } catch (err) {
      alert(err?.message || "신고 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <ReportButton
      isOpen={isOpen}
      isPending={reportMutation.isPending}
      onOpen={handleOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
}
