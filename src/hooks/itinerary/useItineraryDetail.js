import { useQuery } from "@tanstack/react-query";
import { fetchItineraryById } from "services/itinerary/fetchItineraryById";
import { QUERY_KEYS } from "constants/queryKeys";

export const useItineraryDetail = (id) => {
  return useQuery({
    queryKey: QUERY_KEYS.ITINERARY_DETAIL(id),
    queryFn: () => fetchItineraryById(id),
    enabled: !!id, // id가 존재할 때만 fetch
  });
};
