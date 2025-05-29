import { useState } from "react";
import { useUpdateProfile } from "@/hooks/mypage/useUpdateProfile";
import ButtonSpinner from "@/components/common/loading/ButtonSpinner";
import FormInput from "@/components/common/form/FormInput";
import FormTextarea from "@/components/common/form/FormTextarea";

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
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded bg-black text-white hover:bg-gray-900 transition disabled:opacity-60 min-w-[80px] flex items-center justify-center"
            >
              {isLoading ? (
                <span className="w-4 h-4 flex items-center justify-center">
                  <ButtonSpinner size={16} color="white" />
                </span>
              ) : (
                <span>저장</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
