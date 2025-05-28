import ProfileEditModal from "@/components/modal/ProfileEditModal";
import ModalPortal from "@/components/common/modal/ModalPortal";
import RoundedButton from "@/components/common/button/RoundedButton";
import { Camera, Edit, LogOut, Settings } from "lucide-react";
import SettingModal from "@/components/modal/SettingModal";
import ChangePasswordModal from "@/components/modal/ChangePasswordModal";
import DeleteAccountModal from "@/components/modal/DeleteAccountModal";

export default function ProfileSection({
  user,
  stats,
  statsLoading,
  modals,
  toggleModal,
  isLoggingOut,
  onImageChange,
  onPasswordChange,
  onLogout,
  onDeleteAccount,
}) {
  return (
    <>
      <section className="flex flex-col items-center text-center px-6 py-16">
        {/* 왼쪽: 프로필 정보 */}
        <div className="relative group w-32 h-32 mb-4">
          <img
            src={user?.photoURL || "/images/default-profile.png"}
            alt="프로필 이미지"
            className="w-32 h-32 object-cover rounded-full border-2 border-white shadow-md"
          />
          {/* 업로드 버튼 (hover 시 표시) */}
          <label
            htmlFor="profile-image-upload"
            className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer"
          >
            <Camera className="w-6 h-6" />
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
          </label>
        </div>

        {/* 텍스트 정보 */}
        <div className="space-y-1 mb-8">
          <h2 className="text-xl font-semibold text-white">
            {user?.displayName || "닉네임 없음"}
          </h2>
          <p className="text-sm text-gray-400">@{user?.email?.split("@")[0]}</p>
          <p className="text-sm text-white mt-2 whitespace-pre-wrap max-w-md">
            {user?.bio?.trim() || "소개 문구가 없습니다."}
          </p>
        </div>

        {/* 오른쪽: 버튼 그룹 */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <RoundedButton
            label="Profile"
            onClick={toggleModal.openEdit}
            icon={<Edit className="text-sm" />}
          />

          <RoundedButton
            label="Setting"
            onClick={toggleModal.openSetting} // 수정된 부분
            icon={<Settings className="text-sm" />}
          />

          <RoundedButton
            label="Logout"
            onClick={onLogout}
            isLoading={isLoggingOut}
            icon={<LogOut className="w-4 h-4" />}
          />
        </div>

        {/* 하단 통계 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl px-6">
          {[
            { label: "여행 일정", count: stats?.itineraryCount },
            { label: "여행 리뷰", count: stats?.reviewCount },
            { label: "채팅방", count: stats?.chatRoomCount },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/50 backdrop-blur-lg rounded-lg py-4 text-center"
            >
              <p className="text-lg text-white font-semibold">
                {statsLoading ? "..." : item.count ?? "-"}
              </p>
              <p className="text-sm text-gray-200">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
      {/* 모달 컴포넌트 렌더링 */}
      <ModalPortal>
        <ProfileEditModal
          isOpen={modals.isEditModalOpen}
          onClose={toggleModal.closeEdit}
          user={user}
        />

        <SettingModal
          isOpen={modals.isSettingModalOpen}
          onClose={toggleModal.closeSetting}
          onPasswordChange={() => {
            toggleModal.closeSetting();
            toggleModal.openPassword();
          }}
          onDeleteAccount={() => {
            toggleModal.closeSetting();
            toggleModal.openDelete();
          }}
        />
        <ChangePasswordModal
          isOpen={modals.isPasswordModalOpen}
          onClose={toggleModal.closePassword}
          onSubmit={onPasswordChange}
        />

        <DeleteAccountModal
          isOpen={modals.isDeleteModalOpen}
          onClose={toggleModal.closeDelete}
          onConfirm={onDeleteAccount}
        />
      </ModalPortal>
    </>
  );
}
