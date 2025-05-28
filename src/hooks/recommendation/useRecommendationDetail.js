import { useQuery } from "@tanstack/react-query";
import { fetchRecommendationDetail } from "@/services/recommendation/fetchRecommendationDetail";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useRecommendationDetail(id) {
  return useQuery({
    queryKey: QUERY_KEYS.RECOMMENDATION_DETAIL(id),
    queryFn: () => fetchRecommendationDetail(id),
    enabled: !!id, // id가 있을 때만 실행
  });
}
