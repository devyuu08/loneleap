import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X, AlertTriangle } from "lucide-react";
import PropTypes from "prop-types";
import ErrorMessage from "components/common/ErrorMessage";

export default function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      await onConfirm(password.trim());
    } catch (err) {
      console.error("계정 탈퇴 실패:", err);
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        setError("비밀번호가 올바르지 않습니다.");
      } else if (err.code === "auth/too-many-requests") {
        setError("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
      } else {
        setError("계정 탈퇴에 실패했습니다. 다시 시도해주세요.");
      }
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
          {/* 헤더 */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">계정 탈퇴</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* 내용 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <p className="text-sm">
                작성한 리뷰, 일정, 채팅방 기록이 모두 삭제됩니다.
              </p>
            </div>

            <p className="text-sm text-gray-700">
              탈퇴를 위해 비밀번호를 다시 입력해주세요.
            </p>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="현재 비밀번호"
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
                onClick={handleConfirm}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                {isLoading ? "탈퇴 중..." : "탈퇴하기"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

DeleteAccountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
