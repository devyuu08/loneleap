import { useQuery } from "@tanstack/react-query";
import { fetchRecommendationDetail } from "@/services/recommendation/fetchRecommendationDetail";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useRecommendationDetail(id, options = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.RECOMMENDATION_DETAIL(id),
    queryFn: () => fetchRecommendationDetail(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10분 동안 fresh 상태 유지
    cacheTime: 30 * 60 * 1000, // 캐시도 유지
    ...options,
  });
}
