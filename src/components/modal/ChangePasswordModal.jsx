import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import ErrorMessage from "@/components/common/feedback/ErrorMessage";
import FormInput from "@/components/common/form/FormInput";
import ModalFooterButton from "@/components/common/button/ModalFooterButton";

/**
 * ChangePasswordModal
 * - 사용자 비밀번호를 변경하는 모달 컴포넌트
 * - 현재 비밀번호 입력 → 새 비밀번호 입력 → 확인 → 제출 처리
 */

export default function ChangePasswordModal({ isOpen, onClose, onSubmit }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 모달이 열릴 때 입력값 및 에러 상태 초기화
  useEffect(() => {
    if (isOpen) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedPassword = newPassword.trim();

    // 비밀번호 유효성 검사
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

    // 비밀번호 변경 시도
    setIsLoading(true);
    try {
      await onSubmit(currentPassword.trim(), trimmedPassword);
      onClose(); // 성공 시 모달 닫기
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
      aria-labelledby="change-password-title"
      aria-describedby="change-password-description"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* 배경 블러 */}
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        {/* 모달 내용 */}
        <div className="relative bg-white w-full max-w-md rounded-xl p-6 z-10">
          {/* 헤더 */}
          <header className="flex justify-between items-center mb-4">
            <h2 id="change-password-title" className="text-lg font-semibold">
              비밀번호 변경
            </h2>
            <button onClick={onClose} aria-label="닫기">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </header>

          {/* 입력 영역 */}
          <section aria-describedby="change-password-description">
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="현재 비밀번호"
              />

              <FormInput
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호"
              />

              <FormInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호 확인"
              />

              <ErrorMessage message={error} />

              {/* 하단 버튼 */}
              <ModalFooterButton
                onClose={onClose}
                onConfirm={handleSubmit}
                confirmLabel="저장"
                isLoading={isLoading}
              />
            </form>
          </section>
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
