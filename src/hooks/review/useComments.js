import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchComments } from "@/services/review/fetchComments";

export const useComments = (reviewId) => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMENTS(reviewId),
    queryFn: () => fetchComments(reviewId),
    enabled: !!reviewId,
  });
};
