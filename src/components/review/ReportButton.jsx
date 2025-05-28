import PropTypes from "prop-types";
import ReportModal from "@/components/common/modal/ReportModal";
import ModalPortal from "@/components/common/modal/ModalPortal";

export default function ReportButton({
  isOpen,
  isPending,
  onOpen,
  onClose,
  onSubmit,
}) {
  return (
    <>
      <button
        onClick={onOpen}
        disabled={isPending}
        className="px-3 py-1.5 rounded-full border border-gray-300 text-sm bg-white/60 text-gray-800 backdrop-blur-sm shadow-sm hover:bg-white/80 transition disabled:opacity-50"
      >
        {isPending ? "신고 중..." : "신고하기"}
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
