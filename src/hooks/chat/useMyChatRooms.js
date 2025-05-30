import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getMyChatRooms } from "@/services/chat/getMyChatRooms";

/**
 * 내가 참여한 채팅방 목록 훅
 */
export const useMyChatRooms = (uid, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MY_CHAT_ROOMS(uid),
    enabled: !!uid && options.enabled !== false,
    queryFn: () => getMyChatRooms(uid),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
    ...options,
  });
};
