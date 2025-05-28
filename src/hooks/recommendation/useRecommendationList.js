import { useQuery } from "@tanstack/react-query";
import { fetchRecommendationList } from "@/services/recommendation/fetchRecommendationList";
import { QUERY_KEYS } from "@/constants/queryKeys";

export function useRecommendationList() {
  return useQuery({
    queryKey: [QUERY_KEYS.RECOMMENDATIONS],
    queryFn: fetchRecommendationList,
  });
}
