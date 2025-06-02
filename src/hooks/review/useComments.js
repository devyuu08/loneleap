import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchComments } from "@/services/review/fetchComments";

export const useComments = (reviewId, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMENTS(reviewId),
    queryFn: () => fetchComments(reviewId),
    enabled: !!reviewId && options.enabled !== false,
    staleTime: 3 * 60 * 1000, // 캐싱 최적화
    cacheTime: 10 * 60 * 1000,
    onError: (err) => {
      console.error("댓글 불러오기 오류:", err);
    },
    ...options,
  });
};
