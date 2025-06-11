import { useCallback, useState } from "react";
import { useReportReview } from "@/hooks/review/useReportReview";
import ReportButton from "@/components/review/ReportButton";
import toast from "react-hot-toast";

/**
 * ReportButtonContainer
 * - 리뷰 신고 버튼 및 모달 제어, 신고 처리 로직을 담당하는 컨테이너 컴포넌트
 * - 신고 사유 입력 후, React Query mutation을 통해 Firestore에 신고 기록 저장
 * - 모달 상태 관리 및 에러 처리 포함
 */

export default function ReportButtonContainer({ reviewId }) {
  const [isOpen, setIsOpen] = useState(false);
  const reportMutation = useReportReview();

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleSubmit = useCallback(
    async ({ reason }) => {
      try {
        await reportMutation.mutateAsync({ reviewId, reason });
        toast.success("신고가 접수되었습니다.");
        handleClose();
      } catch (err) {
        toast.error(err?.message || "신고 처리 중 오류가 발생했습니다.");
      }
    },
    [reviewId, reportMutation, handleClose]
  );

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
