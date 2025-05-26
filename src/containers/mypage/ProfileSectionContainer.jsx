import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, storage, db } from "services/firebase";
import { anonymizePublicProfile } from "utils/deleteAccount";

import { setUser, clearUser } from "store/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "services/auth";
import { changeUserPassword } from "services/userService";
import { useUserStats } from "hooks/mypage/useUserStats";
import { anonymizeUserContent } from "utils/deleteAccount";
import ProfileSection from "components/mypage/ProfileSection";

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
      const storageRef = ref(storage, `profile_images/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Auth 프로필 업데이트
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      });

      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;

      // Firestore 문서 업데이트 (users_public 기준)
      await setDoc(
        doc(db, "users_public", user.uid),
        { photoURL: downloadURL },
        { merge: true }
      );

      const collections = [
        { name: "reviews", path: "createdBy" },
        { name: "itineraries", path: "createdBy" },
        { name: "chatRooms", path: "createdBy" },
        { name: "chatMessages", path: "sender" },
      ];

      await Promise.all(
        collections.map(async ({ name, path }) => {
          const q = query(
            collection(db, name),
            where(`${path}.uid`, "==", user.uid)
          );
          const snap = await getDocs(q);
          return Promise.all(
            snap.docs.map((doc) =>
              updateDoc(doc.ref, {
                [`${path}.photoURL`]: downloadURL,
              })
            )
          );
        })
      );

      // Redux 상태 동기화
      dispatch(setUser({ ...user, photoURL: updatedUser.photoURL }));
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
    const user = auth.currentUser;
    const uid = user?.uid;
    if (!user || !uid) return;

    try {
      // 1. 재인증
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // 2. 익명화
      await anonymizePublicProfile(uid);
      await anonymizeUserContent(uid);

      // 3. 계정 삭제
      await deleteUser(user);

      // 4. 상태 초기화
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
