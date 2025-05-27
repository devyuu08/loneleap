import { auth } from "services/firebase";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

/**
 * Firebase에서 비밀번호 변경 처리
 * @param {string} newPassword 새 비밀번호
 * @param {string} currentPassword 기존 비밀번호 (reauthenticate용)
 */
export const changeUserPassword = async (newPassword, currentPassword) => {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("사용자 정보를 불러올 수 없습니다.");
  }

  // 인증 정보 생성
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  // 기존 비밀번호로 재인증
  await reauthenticateWithCredential(user, credential);

  // 새 비밀번호로 변경
  await updatePassword(user, newPassword);
};
