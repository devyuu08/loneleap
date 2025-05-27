import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

import { auth, db } from "services/firebase";
import { logout } from "services/auth/auth";
import { changeUserPassword } from "services/userService";

import { setUser, clearUser } from "store/userSlice";
import { useUserStats } from "hooks/mypage/useUserStats";
import ProfileSection from "components/mypage/ProfileSection";
import { uploadUserProfileImage } from "services/user/uploadUserProfileImage";
import { updateUserPhotoInContent } from "services/user/updateUserPhotoInContent";
import { deleteUserAccount } from "services/user/deleteUserAccount";

export default function ProfileSectionContainer() {
  const user = useSelector((state) => state.user.user);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data: stats, isLoading: statsLoading } = useUserStats(user?.uid);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modals = {
    isEditModalOpen,
    isSettingModalOpen,
    isPasswordModalOpen,
    isDeleteModalOpen,
  };

  const toggleModal = {
    openEdit: () => setIsEditModalOpen(true),
    closeEdit: () => setIsEditModalOpen(false),
    openSetting: () => setIsSettingModalOpen(true),
    closeSetting: () => setIsSettingModalOpen(false),
    openPassword: () => setIsPasswordModalOpen(true),
    closePassword: () => setIsPasswordModalOpen(false),
    openDelete: () => setIsDeleteModalOpen(true),
    closeDelete: () => setIsDeleteModalOpen(false),
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    try {
      // Firebase Storage 업로드
      const downloadURL = await uploadUserProfileImage(file, user.uid);

      // Auth 프로필 업데이트
      await updateProfile(auth.currentUser, { photoURL: downloadURL });
      await auth.currentUser.reload();

      // Firestore users_public 문서 업데이트
      await setDoc(
        doc(db, "users_public", user.uid),
        { photoURL: downloadURL },
        { merge: true }
      );

      // 사용자 콘텐츠 업데이트
      await updateUserPhotoInContent(user.uid, downloadURL);

      // Redux 상태 동기화
      dispatch(setUser({ ...user, photoURL: auth.currentUser.photoURL }));
    } catch (err) {
      console.error("프로필 이미지 업로드 오류:", err);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const handlePasswordChange = async (currentPw, newPw) => {
    try {
      await changeUserPassword(newPw, currentPw);
      alert("비밀번호가 성공적으로 변경되었습니다.");
    } catch (err) {
      console.error("비밀번호 변경 실패:", err);
      alert("비밀번호 변경에 실패했습니다. 현재 비밀번호를 다시 확인해주세요.");
    }
  };

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

  const handleDeleteAccount = async (currentPassword) => {
    const email = user?.email;
    if (!email || !currentPassword) return;

    try {
      await deleteUserAccount(email, currentPassword);
      dispatch(clearUser());
      navigate("/");
    } catch (err) {
      alert("계정 탈퇴 중 오류가 발생했습니다: " + err.message);
    }
  };

  return (
    <ProfileSection
      user={user}
      stats={stats}
      statsLoading={statsLoading}
      modals={modals}
      toggleModal={toggleModal}
      isLoggingOut={isLoggingOut}
      onImageChange={handleImageChange}
      onPasswordChange={handlePasswordChange}
      onLogout={handleLogout}
      onDeleteAccount={handleDeleteAccount}
    />
  );
}
