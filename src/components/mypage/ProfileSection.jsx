import ProfileEditModal from "@/components/modal/ProfileEditModal";
import ModalPortal from "@/components/common/modal/ModalPortal";
import RoundedButton from "@/components/common/button/RoundedButton";
import { Edit, LogOut, Settings } from "lucide-react";
import SettingModal from "@/components/modal/SettingModal";
import ChangePasswordModal from "@/components/modal/ChangePasswordModal";
import DeleteAccountModal from "@/components/modal/DeleteAccountModal";
import ProfileInfoCard from "@/components/mypage/ProfileInfoCard";

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
        {/* 프로필 정보 */}
        <div className="py-10">
          <ProfileInfoCard user={user} onImageChange={onImageChange} />
        </div>

        {/* 버튼 그룹 */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <RoundedButton
            label="Profile"
            onClick={toggleModal.openEdit}
            icon={<Edit className="text-sm" />}
          />

          <RoundedButton
            label="Setting"
            onClick={toggleModal.openSetting}
            icon={<Settings className="text-sm" />}
          />

          <RoundedButton
            label="Logout"
            onClick={onLogout}
            isLoading={isLoggingOut}
            icon={!isLoggingOut && <LogOut className="w-4 h-4" />}
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
