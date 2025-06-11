import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchReviews } from "@/services/review/fetchReviews";
import { toast } from "react-hot-toast";

/**
 * useReviews
 *
 * - 전체 리뷰 리스트를 가져오는 React Query 기반 커스텀 훅
 * - 최신순(createdAt 기준 내림차순)으로 정렬된 데이터를 반환
 * - 좋아요 상태 등의 변경 사항이 즉시 반영되도록 staleTime: 0 설정
 * - 캐시는 30분간 유지되어 성능을 고려한 데이터 재사용 가능
 * - React Query 캐시를 단일 상태로 사용하며, 옵티미스틱 UI 구조와 연동
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
    onError: () => {
      toast.error("리뷰 데이터를 불러오는 중 문제가 발생했습니다.");
    },
  });
}
