import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "@tanstack/react-query";
import { auth } from "@/services/firebase";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchMyReviews } from "@/services/review/fetchMyReviews";

/**
 * useMyReviews
 * - 현재 로그인한 사용자의 리뷰 목록을 조회
 * - user.uid 기반으로 queryKey 구성
 * - 로딩 중에는 fetch 방지, staleTime 5분, cacheTime 30분 유지
 */

export const useMyReviews = (options = {}) => {
  const [user, loading] = useAuthState(auth);

  return useQuery({
    queryKey: QUERY_KEYS.MY_REVIEWS(user?.uid),
    queryFn: () => fetchMyReviews(user.uid),
    enabled: !loading && !!user?.uid && options.enabled !== false,
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh 상태 유지
    cacheTime: 30 * 60 * 1000, // 30분 동안 캐시 유지
    onError: (err) => {
      console.error("내 리뷰 불러오기 오류:", err);
    },
    ...options,
  });
};
