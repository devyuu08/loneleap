import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X, AlertTriangle } from "lucide-react";
import PropTypes from "prop-types";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase";
import FormInput from "@/components/common/form/FormInput";
import ModalFooterButton from "@/components/common/button/ModalFooterButton";

export default function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setError("");
    }
  }, [isOpen]);

  const [user] = useAuthState(auth);
  const isPasswordUser = user?.providerData?.some(
    (p) => p.providerId === "password"
  );

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
            <div className="flex items-start gap-3 text-red-600">
              <AlertTriangle className="w-5 h-5 mt-1" />
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  작성한{" "}
                  <strong className="text-red-700 font-medium">
                    리뷰, 일정, 채팅방 기록은 삭제되지 않습니다.
                  </strong>
                </p>
                <p>
                  대신, 작성자 정보는{" "}
                  <strong className="text-red-700 font-medium">
                    "탈퇴한 사용자"
                  </strong>
                  로 익명 처리됩니다.
                </p>
                <p>
                  기록 삭제를 원하실 경우,{" "}
                  <strong className="text-red-700 font-medium">
                    관리자에게 별도로 문의
                  </strong>
                  해 주세요.
                </p>
              </div>
            </div>

            {isPasswordUser ? (
              <>
                <p className="text-sm text-gray-700">
                  탈퇴를 위해 비밀번호를 다시 입력해주세요.
                </p>
                <FormInput
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="현재 비밀번호"
                  error={error}
                />
              </>
            ) : (
              <p className="text-sm text-gray-700">
                이 계정은 소셜 로그인으로 가입되었습니다. 별도 비밀번호 확인
                없이 탈퇴할 수 있습니다.
              </p>
            )}

            <ModalFooterButton
              onClose={onClose}
              onConfirm={isPasswordUser ? handleConfirm : onConfirm}
              confirmLabel="탈퇴하기"
              confirmColor="red"
              isLoading={isLoading}
              disabled={isPasswordUser && !password}
            />
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
