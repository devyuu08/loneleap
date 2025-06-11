import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchComments } from "@/services/review/fetchComments";
import { toast } from "react-hot-toast";

/**
 * useComments
 * - 특정 리뷰에 대한 댓글 목록을 가져오는 query 훅
 * - reviewId가 존재할 때만 fetch 수행
 * - staleTime 3분, cacheTime 10분 설정
 */

export function useComments(reviewId, options = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.COMMENTS(reviewId),
    queryFn: () => fetchComments(reviewId),
    enabled: !!reviewId && options.enabled !== false,
    staleTime: 3 * 60 * 1000, // 캐싱 최적화
    cacheTime: 10 * 60 * 1000,
    onError: () => {
      toast.error("댓글을 불러오는 중 문제가 발생했습니다.");
    },
    ...options,
  });
}
