import { useQuery } from "@tanstack/react-query";
import { fetchItineraryById } from "services/itineraryService";

export const useItineraryDetail = (id) => {
  return useQuery({
    queryKey: ["itineraryDetail", id],
    queryFn: () => fetchItineraryById(id),
    enabled: !!id, // id가 존재할 때만 fetch
  });
};
