import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getChatRooms } from "@/services/chat/getChatRooms";

// Firestore에서 채팅방 목록 최신순으로 가져오는 기본 구조
// limitCount: 가져올 채팅방의 수 (기본값: 10)
/**
 * 전체 채팅방 목록 훅
 */
export const useChatRooms = ({
  limitCount = 10,
  orderDirection = "desc",
  filterBy = null,
} = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHAT_ROOMS_FILTERED(
      limitCount,
      orderDirection,
      filterBy
    ),
    queryFn: () => getChatRooms({ limitCount, orderDirection, filterBy }),
    refetchInterval: 30000,
    staleTime: 10000,
  });
};
