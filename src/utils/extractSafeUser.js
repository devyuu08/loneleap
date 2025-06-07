/**
 * 민감 정보가 제거된 사용자 객체를 생성합니다.
 * @param {Object} user - Firebase User 객체
 * @param {string} [bio=""] - 사용자 소개 문구
 * @returns {Object} 가공된 사용자 정보
 */

export const extractSafeUser = (user, bio = "") => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName || "",
  photoURL: user.photoURL || "",
  bio,
});
