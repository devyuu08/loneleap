import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchChatRooms } from "@/services/chat/fetchChatRooms";

// Firestore에서 채팅방 목록 최신순으로 가져오는 기본 구조
// limitCount: 가져올 채팅방의 수 (기본값: 10)
/**
 * 전체 채팅방 목록 훅
 */
export const useChatRooms = ({
  limitCount = 10,
  orderDirection = "desc",
  filterBy = null,
  enabled = true,
  ...options
} = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHAT_ROOMS_FILTERED(
      limitCount,
      orderDirection,
      filterBy
    ),
    queryFn: () =>
      fetchChatRooms({
        limitCount,
        orderDirection,
        filterBy,
      }),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchInterval: 30000, // 30초 polling 유지 (실시간성 고려)
    refetchOnWindowFocus: true, // 창에 다시 포커스 시 갱신
    enabled,
    ...options,
  });
};
