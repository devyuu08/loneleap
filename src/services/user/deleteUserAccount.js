import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";
import { auth } from "@/services/firebase";
import {
  anonymizePublicProfile,
  anonymizeUserContent,
} from "@/utils/deleteAccount";

/**
 * 계정 탈퇴 처리: 재인증, 익명화, 삭제
 * @param {string} email
 * @param {string} password
 */
export async function deleteUserAccount(email, password) {
  const user = auth.currentUser;
  if (!user || user.email !== email) throw new Error("사용자 정보 불일치");

  const credential = EmailAuthProvider.credential(email, password);
  await reauthenticateWithCredential(user, credential);

  const uid = user.uid;
  await anonymizePublicProfile(uid);
  await anonymizeUserContent(uid);

  await deleteUser(user);
}
