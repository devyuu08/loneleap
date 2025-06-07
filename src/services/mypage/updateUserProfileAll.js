import { updatePublicUserProfile } from "@/services/user/updatePublicUserProfile";
import { updatePrivateUserProfile } from "@/services/user/updatePrivateUserProfile";
import { updateUserContentProfile } from "@/services/user/updateUserContentProfile";
import { updateUserState } from "@/services/user/updateUserState";
import { updateFirebaseUserProfile } from "@/services/user/updateFirebaseUserProfile";

/**
 * 사용자 프로필 정보를 Firebase 전역에 걸쳐 일괄 업데이트
 *
 * - Firebase Auth의 기본 프로필 정보 수정
 * - 공개 Firestore 프로필 (users/{uid}) 업데이트
 * - 비공개 Firestore 프로필 (users_private/{uid}) 생성 보장
 * - 사용자가 작성한 리뷰, 일정, 채팅 메시지 내 프로필 정보 반영
 * - Redux 상태 동기화 (userSlice)
 *
 * @param {object} params - 업데이트에 필요한 파라미터 객체
 * @param {string} params.uid - 사용자 UID
 * @param {string} params.displayName - 새 사용자 이름
 * @param {string} params.photoURL - 새 프로필 이미지 URL
 * @param {string} params.bio - 자기소개 텍스트
 * @param {function} params.dispatch - Redux dispatch 함수
 * @param {object} params.user - 기존 사용자 객체
 * @returns {Promise<void>}
 */

export const updateUserProfileAll = async ({
  uid,
  displayName,
  photoURL,
  bio,
  dispatch,
  user,
}) => {
  // Firebase Auth 프로필
  await updateFirebaseUserProfile({ displayName, photoURL });

  // 공개 Firestore
  await updatePublicUserProfile({ uid, displayName, photoURL, bio }); // 공개 여부 상관없이 uid로 경로 지정

  // 비공개 Firestore
  await updatePrivateUserProfile({ uid });

  // 사용자 콘텐츠(리뷰, 일정, 채팅)
  await updateUserContentProfile({ uid, displayName, photoURL });

  // Redux 상태 반영
  updateUserState({
    dispatch,
    user,
    displayName,
    photoURL,
    bio,
  });
};
