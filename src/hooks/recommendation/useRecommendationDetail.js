import { useQuery } from "@tanstack/react-query";
import { fetchRecommendationDetail } from "@/services/recommendation/fetchRecommendationDetail";
import { QUERY_KEYS } from "@/constants/queryKeys";

/**
 * useRecommendationDetail
 * - 추천 여행지 상세 정보를 가져오는 query 훅
 * - 여행지 id를 기반으로 Firestore에서 데이터 조회
 * - id가 존재할 때만 fetch 수행
 * - 기본적으로 10분간 fresh 상태 유지, 30분간 캐시 유지
 */

export function useRecommendationDetail(id, options = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.RECOMMENDATION_DETAIL(id),
    queryFn: () => fetchRecommendationDetail(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10분 동안 fresh 상태 유지
    cacheTime: 30 * 60 * 1000, // 캐시도 유지
    ...options,
  });
}
