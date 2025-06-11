import { useQuery } from "@tanstack/react-query";
import { fetchRecommendationList } from "@/services/recommendation/fetchRecommendationList";
import { QUERY_KEYS } from "@/constants/queryKeys";

/**
 * useRecommendationList
 * - 전체 추천 여행지 리스트를 가져오는 query 훅
 * - 리스트는 지역 필터링 또는 지도 섹션 등에 활용됨
 * - 기본적으로 10분간 fresh 상태 유지, 30분간 메모리 캐시 유지
 * - 창 포커스 변화 시 자동 refetch는 비활성화됨
 */

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
