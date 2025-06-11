import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchRecentReviews } from "@/services/review/fetchRecentReviews";

/**
 * useRecentReviews
 * - 메인 홈화면 등에서 최근 리뷰만 가져오는 query 훅
 * - 별도 staleTime/cacheTime 설정 없이 단순 fetch
 */

export function useRecentReviews() {
  return useQuery({
    queryKey: [QUERY_KEYS.RECENT_REVIEWS],
    queryFn: fetchRecentReviews,
  });
}
