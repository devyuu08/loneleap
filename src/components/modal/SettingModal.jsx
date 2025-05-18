import { Dialog } from "@headlessui/react";
import { X, Lock, Trash2 } from "lucide-react";
import PropTypes from "prop-types";

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
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="relative bg-white w-full max-w-md rounded-xl p-6 z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">설정</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <button
              className="flex items-center gap-2 w-full text-left hover:bg-gray-100 px-3 py-2 rounded-md"
              onClick={onPasswordChange}
            >
              <Lock className="w-4 h-4 text-gray-700" />
              <span>비밀번호 변경</span>
            </button>

            <button
              className="flex items-center gap-2 w-full text-left hover:bg-gray-100 px-3 py-2 rounded-md text-red-600"
              onClick={onDeleteAccount}
            >
              <Trash2 className="w-4 h-4" />
              <span>계정 탈퇴</span>
            </button>
          </div>
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
