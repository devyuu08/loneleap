import { useState } from "react";
import { useUpdateProfile } from "@/hooks/mypage/useUpdateProfile";
import FormInput from "@/components/common/form/FormInput";
import FormTextarea from "@/components/common/form/FormTextarea";
import ModalFooterButton from "@/components/common/button/ModalFooterButton";

export default function ProfileEditModal({ isOpen, onClose, user }) {
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const { updateProfile, isLoading } = useUpdateProfile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ displayName, bio });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-black">프로필 수정</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            id="displayName"
            name="displayName"
            label="닉네임"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <FormTextarea
            id="bio"
            name="bio"
            label="소개 문구"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
          />

          <ModalFooterButton
            onClose={onClose}
            onConfirm={handleSubmit}
            confirmLabel="저장"
            isLoading={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
