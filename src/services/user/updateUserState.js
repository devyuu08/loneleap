import { setUser } from "@/store/userSlice";

/**
 * Redux 상태에서 사용자 정보를 업데이트
 * @param {Object} params
 * @param {Function} dispatch - redux dispatch 함수
 * @param {Object} user - 기존 사용자 정보
 * @param {string} displayName - 새 사용자 이름
 * @param {string} [photoURL] - 새 프로필 이미지 URL
 * @param {string} bio - 새 자기소개
 */
export function updateUserState({
  dispatch,
  user,
  displayName,
  photoURL,
  bio,
}) {
  dispatch(
    setUser({
      uid: user.uid,
      email: user.email,
      displayName,
      photoURL: photoURL !== undefined ? photoURL : user.photoURL,
      bio,
    })
  );
}
