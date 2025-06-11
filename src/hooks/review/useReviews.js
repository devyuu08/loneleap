import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchReviews } from "@/services/review/fetchReviews";

/**
 * useReviews
 * - 전체 리뷰 리스트를 가져오는 query 훅
 * - 최신순 정렬 포함
 * - 캐시 최적화를 위해 staleTime 5분, cacheTime 30분 설정
 */

export function useReviews(enabled = true) {
  return useQuery({
    queryKey: [QUERY_KEYS.REVIEWS],
    queryFn: fetchReviews,
    staleTime: 0,
    cacheTime: 30 * 60 * 1000,
    select: (data) =>
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    enabled,
    onError: (err) => {
      console.error("리뷰 데이터를 불러오는 중 오류 발생:", err);
    },
  });
}
