import { useQuery } from "@tanstack/react-query";
import { fetchRecommendationList } from "@/services/recommendation/fetchRecommendationList";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useRecommendationList(options = {}) {
  return useQuery({
    queryKey: [QUERY_KEYS.RECOMMENDATIONS],
    queryFn: fetchRecommendationList,
    staleTime: 10 * 60 * 1000, // 10분 간 fresh 처리
    cacheTime: 30 * 60 * 1000, // 30분 간 메모리 유지
    refetchOnWindowFocus: false,
    ...options,
  });
}
