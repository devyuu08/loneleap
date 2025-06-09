import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { X, AlertTriangle } from "lucide-react";
import PropTypes from "prop-types";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase";
import FormInput from "@/components/common/form/FormInput";
import ModalFooterButton from "@/components/common/button/ModalFooterButton";

/**
 * DeleteAccountModal
 * - 사용자 계정 탈퇴 처리 모달
 * - 소셜/비밀번호 계정 여부에 따라 입력 요구 여부 결정
 */

export default function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 모달 열릴 때 상태 초기화
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

  // 탈퇴 확인 핸들러 (비밀번호 입력 기반)
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
      aria-labelledby="delete-account-title"
      aria-describedby="delete-account-desc"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* 배경 오버레이 */}
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        {/* 모달 본문 */}
        <div className="relative bg-white w-full max-w-md rounded-xl p-6 z-10">
          {/* 헤더 */}
          <header className="flex justify-between items-center mb-4">
            <h2 id="delete-account-title" className="text-lg font-semibold">
              계정 탈퇴
            </h2>
            <button onClick={onClose} aria-label="닫기">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </header>

          {/* 설명 + 입력 영역 */}
          <section aria-describedby="delete-account-desc" className="space-y-4">
            {isPasswordUser ? (
              <>
                {/* 안내 문구 */}
                <div className="flex items-start gap-3 text-red-600">
                  <AlertTriangle className="w-5 h-5 mt-1" />
                  <div
                    id="delete-account-desc"
                    className="text-sm text-gray-700 space-y-1"
                  >
                    <p>
                      작성한{" "}
                      <strong className="text-red-700 font-medium">
                        리뷰, 일정, 채팅방 기록은 삭제되지 않습니다.
                      </strong>
                    </p>
                    <p>
                      작성자는{" "}
                      <strong className="text-red-700 font-medium">
                        "탈퇴한 사용자"
                      </strong>
                      로 익명 처리됩니다.
                    </p>
                    <p>
                      기록 삭제를 원하실 경우,{" "}
                      <strong className="text-red-700 font-medium">
                        관리자에게 문의
                      </strong>
                      해 주세요.
                    </p>
                  </div>
                </div>

                {/* 비밀번호 입력 폼 */}
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4"
                >
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
                </form>

                {/* 탈퇴 버튼 */}
                <ModalFooterButton
                  onClose={onClose}
                  onConfirm={handleConfirm}
                  confirmLabel="탈퇴하기"
                  confirmColor="red"
                  isLoading={isLoading}
                  disabled={!password}
                />
              </>
            ) : (
              // 소셜 로그인 안내 문구만
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  이 계정은 소셜 로그인(Google, Naver 등)으로 가입된 계정입니다.
                </p>
                <p>
                  보안상의 이유로 클라이언트에서는 탈퇴가 불가능합니다.
                  <br />
                  <strong className="text-red-600">
                    계정 탈퇴를 원하실 경우, 관리자에게 문의해 주세요.
                  </strong>
                </p>
              </div>
            )}
          </section>
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
