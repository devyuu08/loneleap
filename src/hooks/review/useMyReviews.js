import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "@tanstack/react-query";
import { auth } from "@/services/firebase";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchMyReviews } from "@/services/review/fetchMyReviews";

export const useMyReviews = (options = {}) => {
  const [user, loading] = useAuthState(auth);

  return useQuery({
    queryKey: QUERY_KEYS.MY_REVIEWS(user?.uid),
    enabled: !loading && !!user?.uid && options.enabled !== false,
    queryFn: () => fetchMyReviews(user.uid),
    ...options,
  });
};
