import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchReviews } from "@/services/review/fetchReviews";

export const useReviews = () =>
  useQuery({
    queryKey: [QUERY_KEYS.REVIEWS],
    queryFn: fetchReviews,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    onError: (err) => {
      console.error("리뷰 불러오기 오류:", err);
    },
  });
