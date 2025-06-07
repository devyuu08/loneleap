import React from "react";
import PropTypes from "prop-types";
import ReportModal from "@/components/common/modal/ReportModal";
import ModalPortal from "@/components/common/modal/ModalPortal";
import ButtonSpinner from "@/components/common/loading/ButtonSpinner";

/**
 * ReportButton
 * - 사용자가 특정 항목(리뷰, 메시지 등)을 신고할 수 있는 버튼 + 모달 트리거 역할
 * - 신고 로딩 중 스피너 표시
 * - 신고 모달을 조건부로 렌더링 (ModalPortal 사용)
 */

function ReportButton({ isOpen, isPending, onOpen, onClose, onSubmit }) {
  const BUTTON_CLASS =
    "px-3 py-1.5 rounded-full border border-gray-300 text-sm bg-white/60 text-gray-800 backdrop-blur-sm shadow-sm hover:bg-white/80 transition disabled:opacity-50";

  return (
    <>
      {/* 신고하기 버튼 */}
      <button
        onClick={onOpen}
        disabled={isPending}
        className={BUTTON_CLASS}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="report-modal"
      >
        <span className="inline-flex items-center justify-center w-[64px] h-[20px]">
          {isPending ? <ButtonSpinner size={16} color="#4B5563" /> : "신고하기"}
        </span>
      </button>

      {/* 신고 모달 */}
      {isOpen && (
        <ModalPortal>
          <ReportModal
            onClose={onClose}
            onSubmit={onSubmit}
            isPending={isPending}
          />
        </ModalPortal>
      )}
    </>
  );
}

ReportButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default React.memo(ReportButton);
