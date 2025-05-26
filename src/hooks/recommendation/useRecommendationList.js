import { useQuery } from "@tanstack/react-query";
import { fetchRecommendationList } from "services/recommendation/fetchRecommendationList";

export function useRecommendationList() {
  return useQuery({
    queryKey: ["recommendations"],
    queryFn: fetchRecommendationList,
  });
}
