import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "services/auth";
import { clearUser } from "store/userSlice";
import ProfileEditModal from "components/modal/ProfileEditModal";
import ModalPortal from "components/common/ModalPortal";
import RoundedButton from "components/common/RoundedButton";
import { Edit, LogOut, Settings } from "lucide-react";

export default function ProfileSection() {
  const user = useSelector((state) => state.user.user);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout(); // Firebase 로그아웃
      dispatch(clearUser()); // Redux 상태 초기화
      navigate("/"); // 홈으로 이동
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-10">
        {/* 왼쪽: 프로필 정보 */}
        <div className="flex items-center gap-6">
          {/* 이미지 */}
          <img
            src={user?.photoURL || "/default_profile.png"}
            alt="프로필 이미지"
            className="w-28 h-28 object-cover rounded-lg shadow-sm border"
          />

          {/* 텍스트 */}
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">
              {user?.displayName || "닉네임 없음"}
            </h2>
            <p className="text-sm text-gray-500">
              @{user?.email?.split("@")[0]}
            </p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {user?.bio?.trim() || "소개 문구가 없습니다."}
            </p>
          </div>
        </div>

        {/* 오른쪽: 버튼 그룹 */}
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <RoundedButton
            label="Profile"
            onClick={() => setIsEditModalOpen(true)}
            icon={<Edit className="text-sm" />}
          />

          <RoundedButton
            label="Setting"
            onClick={() => alert("준비 중")}
            icon={<Settings className="text-sm" />}
          />

          <RoundedButton
            label="Logout"
            onClick={handleLogout}
            isLoading={isLoggingOut}
            icon={<LogOut className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* 하단 통계 */}
      <div className="grid grid-cols-3 gap-4 px-6 mb-10">
        {[
          { label: "여행 일정", count: 12 },
          { label: "여행 리뷰", count: 8 },
          { label: "채팅방", count: 5 },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-gray-100 rounded-lg py-4 text-center"
          >
            <p className="text-lg font-semibold">{item.count}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
      {/* 모달 컴포넌트 렌더링 */}
      <ModalPortal>
        <ProfileEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
        />
      </ModalPortal>
    </>
  );
}
