import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchItineraries } from "@/services/itinerary/fetchItineraries";
import { toast } from "react-hot-toast";

/**
 * useItineraries
 * - 전체 여행 일정 리스트를 가져오는 query 훅
 * - 최신 순으로 정렬되며, 캐시 및 폴링 전략 포함
 * - `enabled` 파라미터를 통해 조건부 fetch 가능
 */

export function useItineraries(enabled = true) {
  return useQuery({
    queryKey: [QUERY_KEYS.ITINERARIES],
    queryFn: () => fetchItineraries(20),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    select: (data) => data.sort((a, b) => b.createdAt - a.createdAt),
    enabled,
    onError: (err) => {
      toast.error("일정 데이터를 불러오는 중 문제가 발생했습니다.");
    },
  });
}
