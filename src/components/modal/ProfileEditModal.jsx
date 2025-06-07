import { useState } from "react";
import { useUpdateProfile } from "@/hooks/mypage/useUpdateProfile";
import FormInput from "@/components/common/form/FormInput";
import FormTextarea from "@/components/common/form/FormTextarea";
import ModalFooterButton from "@/components/common/button/ModalFooterButton";

/**
 * ProfileEditModal
 * - 사용자 닉네임 및 소개 문구를 수정하는 모달 폼
 */

export default function ProfileEditModal({ isOpen, onClose, user }) {
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const mutation = useUpdateProfile();

  // 저장 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ displayName, bio });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-edit-title"
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        {/* 헤더 */}
        <header>
          <h2
            id="profile-edit-title"
            className="text-xl font-semibold mb-4 text-black"
          >
            프로필 수정
          </h2>
        </header>

        {/* 본문 입력 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <section className="space-y-4">
            <FormInput
              id="displayName"
              name="displayName"
              label="닉네임"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />

            <FormTextarea
              id="bio"
              name="bio"
              label="소개 문구"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
            />
          </section>

          {/* 하단 버튼 */}
          <ModalFooterButton
            onClose={onClose}
            onConfirm={handleSubmit}
            confirmLabel="저장"
            isLoading={mutation.isLoading}
          />
        </form>
      </div>
    </div>
  );
}
