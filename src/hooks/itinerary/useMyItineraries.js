import { useQuery } from "@tanstack/react-query";
import { auth } from "@/services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchMyItineraries } from "@/services/itinerary/fetchMyItineraries";

export const useMyItineraries = (options = {}) => {
  const [user, loading] = useAuthState(auth);

  return useQuery({
    queryKey: QUERY_KEYS.MY_ITINERARIES(user?.uid),
    enabled: !loading && !!user?.uid && options.enabled !== false,
    queryFn: () => fetchMyItineraries(user.uid),
    ...options,
  });
};
