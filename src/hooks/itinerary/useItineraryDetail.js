import { useQuery } from "@tanstack/react-query";
import { fetchItineraryById } from "@/services/itinerary/fetchItineraryById";
import { QUERY_KEYS } from "@/constants/queryKeys";

/**
 * useItineraryDetail
 * - 특정 일정 ID에 대한 상세 정보를 가져오는 query 훅
 * - 일정이 존재할 때만 fetch (`enabled: !!id`)
 * - 일정 상세 페이지에서 사용
 */

export const useItineraryDetail = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.ITINERARY_DETAIL(id),
    queryFn: () => fetchItineraryById(id),
    staleTime: 3 * 60 * 1000,
    enabled: !!id, // id가 존재할 때만 fetch
    onError: (err) => console.error("상세 일정 불러오기 실패:", err),
  });
};
