import React from "react";
import PropTypes from "prop-types";
import ReportModal from "@/components/common/modal/ReportModal";
import ModalPortal from "@/components/common/modal/ModalPortal";
import ButtonSpinner from "@/components/common/loading/ButtonSpinner";

function ReportButton({ isOpen, isPending, onOpen, onClose, onSubmit }) {
  const BUTTON_CLASS =
    "px-3 py-1.5 rounded-full border border-gray-300 text-sm bg-white/60 text-gray-800 backdrop-blur-sm shadow-sm hover:bg-white/80 transition disabled:opacity-50";

  return (
    <>
      <button onClick={onOpen} disabled={isPending} className={BUTTON_CLASS}>
        <span className="inline-flex items-center justify-center w-[64px] h-[20px]">
          {isPending ? <ButtonSpinner size={16} color="#4B5563" /> : "신고하기"}
        </span>
      </button>

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
