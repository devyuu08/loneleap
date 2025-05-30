import { useState } from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

import { useUser } from "@/hooks/auth/useUser";
import { updatePublicUserProfile } from "@/services/user/updatePublicUserProfile";
import { updatePrivateUserProfile } from "@/services/user/updatePrivateUserProfile";
import { updateUserContentProfile } from "@/services/user/updateUserContentProfile";
import { updateUserState } from "@/services/user/updateUserState";
import { updateFirebaseUserProfile } from "@/services/user/updateFirebaseUserProfile";

export function useUpdateProfile() {
  const { user, isLoading: isUserLoading } = useUser(); // 현재 로그인 사용자
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  /**
   * 사용자 프로필 정보 업데이트
   * @param {Object} params
   * @param {string} params.displayName - 사용자 이름
   * @param {string} params.bio - 자기소개
   * @param {string} params.photoURL - 새 프로필 이미지 URL
   */
  const updateProfile = async ({ displayName, bio, photoURL }) => {
    if (isUserLoading || !user) return;

    setIsLoading(true);
    setError(null);

    try {
      // 1. Firebase Auth 프로필 업데이트
      await updateFirebaseUserProfile({ displayName, photoURL });

      // 2. Firestore 공개 프로필 정보 업데이트
      await updatePublicUserProfile({
        uid: user.uid,
        displayName,
        photoURL,
      });

      // 3. Firestore 비공개 프로필 정보 업데이트
      await updatePrivateUserProfile({
        uid: user.uid,
        bio,
      });

      // 4. 작성 콘텐츠에 반영 (리뷰, 일정, 채팅 등)
      await updateUserContentProfile({
        uid: user.uid,
        displayName,
        photoURL,
      });

      // 5. Redux 상태 업데이트
      updateUserState({
        dispatch,
        user,
        displayName,
        photoURL,
        bio,
      });

      // 6. React Query 캐시 무효화
      queryClient.invalidateQueries(["reviews"]);
      queryClient.invalidateQueries(["itineraries"]);
      queryClient.invalidateQueries(["chatRooms"]);
    } catch (err) {
      console.error("프로필 업데이트 실패:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    isLoading,
    error,
  };
}
