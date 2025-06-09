import { useQuery } from "@tanstack/react-query";
import { fetchUserStats } from "@/services/user/fetchUserStats";
import { QUERY_KEYS } from "@/constants/queryKeys";

/**
 * useUserStats
 * - 특정 사용자의 통계 정보(작성 일정 수, 리뷰 수, 신고 이력 등)를 가져오는 query 훅
 * - 관리자 페이지 또는 마이페이지 내 사용자 상태 확인 등에 사용
 * - `uid`가 존재할 때만 fetch하며, 기본적으로 1분간 fresh 상태 유지
 */

export function useUserStats(uid, options = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.USER_STATS(uid),
    queryFn: () => fetchUserStats(uid),
    enabled: !!uid && options.enabled !== false,
    staleTime: 60 * 1000, // 1분 동안 fresh 상태 유지
    cacheTime: 5 * 60 * 1000, // 5분 간 메모리 캐시 유지
    refetchOnWindowFocus: false,
    ...options,
  });
}
