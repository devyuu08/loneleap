import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchItineraries } from "@/services/itinerary/fetchItineraries";

export const useItineraries = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ITINERARIES],
    queryFn: () => fetchItineraries(20),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    onError: (err) => {
      console.error("일정 데이터를 불러오는 중 오류 발생:", err);
    },
  });
};
