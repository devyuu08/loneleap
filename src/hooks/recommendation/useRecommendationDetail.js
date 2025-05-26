import { useQuery } from "@tanstack/react-query";
import { fetchRecommendationDetail } from "services/recommendation/fetchRecommendationDetail";

export function useRecommendationDetail(id) {
  return useQuery({
    queryKey: ["recommendation", id],
    queryFn: () => fetchRecommendationDetail(id),
    enabled: !!id, // id가 있을 때만 실행
  });
}
