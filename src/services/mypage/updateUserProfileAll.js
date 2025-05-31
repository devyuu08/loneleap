import { updatePublicUserProfile } from "@/services/user/updatePublicUserProfile";
import { updatePrivateUserProfile } from "@/services/user/updatePrivateUserProfile";
import { updateUserContentProfile } from "@/services/user/updateUserContentProfile";
import { updateUserState } from "@/services/user/updateUserState";
import { updateFirebaseUserProfile } from "@/services/user/updateFirebaseUserProfile";

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
