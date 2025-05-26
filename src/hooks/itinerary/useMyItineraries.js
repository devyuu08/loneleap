import { useQuery } from "@tanstack/react-query";
import { fetchUserItineraries } from "services/itinerary/fetchUserItineraries";
import { auth } from "services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const useMyItineraries = (options = {}) => {
  const [user, loading] = useAuthState(auth);

  return useQuery({
    queryKey: ["myItineraries", user?.uid],
    queryFn: () => fetchUserItineraries(user.uid),
    enabled: !loading && !!user?.uid && options.enabled !== false,
    ...options, // retry, staleTime 등 추가 옵션 받을 수 있게
  });
};
