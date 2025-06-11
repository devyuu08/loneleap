import { Dialog } from "@headlessui/react";
import { X, Lock, Trash2 } from "lucide-react";
import PropTypes from "prop-types";

/**
 * SettingModal
 * - 사용자 설정 모달 (비밀번호 변경 / 계정 탈퇴)
 */

export default function SettingModal({
  isOpen,
  onClose,
  onPasswordChange,
  onDeleteAccount,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="setting-modal-title"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* 배경 오버레이 */}
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        {/* 모달 콘텐츠 */}
        <div className="relative bg-white w-full max-w-md rounded-xl p-6 z-10">
          {/* 헤더 */}
          <header className="flex justify-between items-center mb-4">
            <h2
              id="setting-modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              설정
            </h2>
            <button onClick={onClose} aria-label="닫기">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </header>

          {/* 설정 항목 */}
          <section className="space-y-4">
            {/* 비밀번호 변경 */}
            <button
              type="button"
              className="flex items-center gap-2 w-full text-left hover:bg-gray-100 px-3 py-2 rounded-md"
              onClick={onPasswordChange}
            >
              <Lock className="w-4 h-4 text-gray-700" />
              <span className="text-gray-800">비밀번호 변경</span>
            </button>

            {/* 계정 탈퇴 */}
            <button
              type="button"
              className="flex items-center gap-2 w-full text-left hover:bg-gray-100 px-3 py-2 rounded-md text-red-600"
              onClick={onDeleteAccount}
            >
              <Trash2 className="w-4 h-4" />
              <span>계정 탈퇴</span>
            </button>
          </section>
        </div>
      </div>
    </Dialog>
  );
}

SettingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onDeleteAccount: PropTypes.func.isRequired,
};
