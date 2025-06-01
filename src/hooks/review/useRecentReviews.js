import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchRecentReviews } from "@/services/review/fetchRecentReviews";

export const useRecentReviews = () =>
  useQuery({
    queryKey: [QUERY_KEYS.RECENT_REVIEWS],
    queryFn: fetchRecentReviews,
  });
