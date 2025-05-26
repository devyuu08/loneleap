import { auth } from "services/firebase";
import { updateProfile as updateFirebaseProfile } from "firebase/auth";

/**
 * Firebase 인증 사용자 프로필 업데이트
 * @param {Object} params
 * @param {string} params.displayName
 * @param {string} [params.photoURL]
 */
export async function updateFirebaseUserProfile({ displayName, photoURL }) {
  if (!auth.currentUser) throw new Error("로그인된 사용자가 없습니다.");

  await updateFirebaseProfile(auth.currentUser, {
    displayName,
    ...(photoURL !== undefined && { photoURL }),
  });

  await auth.currentUser.reload();

  return auth.currentUser;
}
