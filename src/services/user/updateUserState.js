import { setUser } from "@/store/userSlice";

/**
 * Redux 사용자 상태를 업데이트하는 헬퍼 함수
 * @param {Object} params
 * @param {Function} params.dispatch - Redux dispatch 함수
 * @param {Object} params.user - 기존 사용자 객체
 * @param {string} params.displayName - 새 사용자 이름
 * @param {string} [params.photoURL] - 새 프로필 사진 URL (선택)
 * @param {string} [params.bio] - 새 소개글 (선택)
 */
export function updateUserState({
  dispatch,
  user,
  displayName,
  photoURL,
  bio,
}) {
  const newUser = {
    uid: user.uid,
    email: user.email,
    displayName,
    photoURL: photoURL ?? user.photoURL ?? "",
    bio: bio ?? user.bio ?? "",
  };

  dispatch(setUser(newUser));
}
