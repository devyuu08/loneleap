import ProfileEditModal from "@/components/modal/ProfileEditModal";
import ModalPortal from "@/components/common/modal/ModalPortal";
import RoundedButton from "@/components/common/button/RoundedButton";
import { Edit, LogOut, Settings } from "lucide-react";
import SettingModal from "@/components/modal/SettingModal";
import ChangePasswordModal from "@/components/modal/ChangePasswordModal";
import DeleteAccountModal from "@/components/modal/DeleteAccountModal";
import ProfileInfoCard from "@/components/mypage/ProfileInfoCard";

/**
 * ProfileSection
 * - 마이페이지 상단 영역에서 사용자 정보, 통계, 버튼, 모달을 포함한 메인 컴포넌트
 * - 프로필 이미지, 닉네임, bio, 일정/리뷰/채팅 수 등의 정보를 표시
 * - 프로필 수정, 설정, 비밀번호 변경, 로그아웃, 탈퇴 기능 포함
 */

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
  uploading,
}) {
  return (
    <>
      {/* 사용자 정보 및 통계 표시 영역 */}
      <section className="flex flex-col items-center text-center px-4 sm:px-6 py-12 sm:py-16">
        {/* 프로필 카드 */}
        <div className="py-8 sm:py-10">
          <ProfileInfoCard
            user={user}
            onImageChange={onImageChange}
            uploading={uploading}
          />
        </div>

        {/* 버튼 그룹: 프로필 수정, 설정, 로그아웃 */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-10 flex-wrap">
          <RoundedButton
            label="Profile"
            onClick={toggleModal.openEdit}
            icon={<Edit className="w-4 h-4 sm:text-sm" />}
          />

          <RoundedButton
            label="Setting"
            onClick={toggleModal.openSetting}
            icon={<Settings className="w-4 h-4 sm:text-sm" />}
          />

          <RoundedButton
            label="Logout"
            onClick={onLogout}
            isLoading={isLoggingOut}
            icon={!isLoggingOut && <LogOut className="w-4 h-4" />}
          />
        </div>

        {/* 통계 정보 카드 리스트 */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full max-w-5xl px-0 sm:px-6">
          {[
            { label: "여행 일정", count: stats?.itineraryCount },
            { label: "여행 리뷰", count: stats?.reviewCount },
            { label: "채팅방", count: stats?.chatRoomCount },
          ].map((item) => (
            <div
              key={item.label}
              className="min-w-[30%] sm:min-w-0 bg-white/50 backdrop-blur-lg rounded-lg py-4 px-3 text-center flex-1 basis-[30%] sm:basis-0"
            >
              <p className="text-base sm:text-lg text-white font-semibold">
                {statsLoading ? "..." : item.count ?? "-"}
              </p>
              <p className="text-xs sm:text-sm text-gray-200">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 모달들: 프로필 수정, 설정, 비밀번호 변경, 계정 탈퇴 */}
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
