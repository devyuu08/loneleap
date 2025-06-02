import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchReviews } from "@/services/review/fetchReviews";

export const useReviews = (enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.REVIEWS],
    queryFn: fetchReviews,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    select: (data) =>
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    enabled,
    onError: (err) => {
      console.error("리뷰 데이터를 불러오는 중 오류 발생:", err);
    },
  });
};
