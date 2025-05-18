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
import { useUserStats } from "hooks/useUserStats";

import ProfileEditModal from "components/modal/ProfileEditModal";
import ModalPortal from "components/common/ModalPortal";
import RoundedButton from "components/common/RoundedButton";
import { Camera, Edit, LogOut, Settings } from "lucide-react";
import SettingModal from "components/modal/SettingModal";
import ChangePasswordModal from "components/modal/ChangePasswordModal";
import DeleteAccountModal from "components/modal/DeleteAccountModal";
import { anonymizeUserContent } from "utils/deleteAccount";

export default function ProfileSection() {
  const user = useSelector((state) => state.user.user);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data: stats, isLoading: statsLoading } = useUserStats(user?.uid);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              onChange={handleImageChange}
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
            onClick={() => setIsEditModalOpen(true)}
            icon={<Edit className="text-sm" />}
          />

          <RoundedButton
            label="Setting"
            onClick={() => setIsSettingModalOpen(true)} // 수정된 부분
            icon={<Settings className="text-sm" />}
          />

          <RoundedButton
            label="Logout"
            onClick={handleLogout}
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
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
        />

        <SettingModal
          isOpen={isSettingModalOpen}
          onClose={() => setIsSettingModalOpen(false)}
          onPasswordChange={() => {
            setIsSettingModalOpen(false);
            setIsPasswordModalOpen(true);
          }}
          onDeleteAccount={() => {
            setIsSettingModalOpen(false);
            setIsDeleteModalOpen(true);
          }}
        />
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onSubmit={handlePasswordChange}
        />

        <DeleteAccountModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteAccount}
        />
      </ModalPortal>
    </>
  );
}
