import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

import ErrorMessage from "components/common/ErrorMessage";

export default function ChangePasswordModal({ isOpen, onClose, onSubmit }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedPassword = newPassword.trim();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(trimmedPassword)) {
      setError(
        "비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(currentPassword.trim(), trimmedPassword);
      onClose();
    } catch (err) {
      setError("비밀번호 변경 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

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
            <h2 className="text-lg font-semibold">비밀번호 변경</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="현재 비밀번호"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            />

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            />

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            />

            <ErrorMessage message={error} />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                취소
              </button>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900"
              >
                {isLoading ? "처리 중..." : "저장"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

ChangePasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
