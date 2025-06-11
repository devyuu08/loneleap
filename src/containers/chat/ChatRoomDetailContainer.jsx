import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { useChatMessages } from "@/hooks/chat/useChatMessages";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner.jsx";
import ChatRoomDetail from "@/components/chat/ChatRoomDetail";
import { joinRoom } from "@/services/chat/joinRoom";
import { leaveRoom } from "@/services/chat/leaveRoom";
import { fetchRoomInfo } from "@/services/chat/fetchRoomInfo";
import { QUERY_KEYS } from "@/constants/queryKeys";
import toast from "react-hot-toast";

/**
 * ChatRoomDetailContainer
 * - 채팅방 상세 정보 및 메시지 리스트 로딩
 * - 참여자 등록 및 메시지 스크롤 유지 처리 포함
 */

export default function ChatRoomDetailContainer({ roomId }) {
  const scrollRef = useRef(null);
  const executedRef = useRef(false);

  const [roomInfo, setRoomInfo] = useState({ title: "채팅방" });
  const [roomInfoLoading, setRoomInfoLoading] = useState(false);

  const currentUser = useSelector((state) => state.user.user); // 현재 로그인 유저
  const { messages, loading: messageLoading } = useChatMessages(roomId);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // participants에 현재 유저 등록
  useEffect(() => {
    const execute = async () => {
      if (!roomId || !currentUser?.uid || executedRef.current) return;
      executedRef.current = true;

      try {
        await joinRoom({ roomId, user: currentUser });
      } catch {
        toast.error("채팅방 참여 등록 중 문제가 발생했습니다.");
      }
    };
    execute();
  }, [roomId, currentUser]);

  // Firestore에서 채팅방 정보 불러오기
  useEffect(() => {
    if (!roomId) return;

    const fetch = async () => {
      setRoomInfoLoading(true);
      try {
        const data = await fetchRoomInfo(roomId);
        setRoomInfo(data);
      } catch (err) {
        setRoomInfo({ title: "채팅방 정보를 불러올 수 없습니다." });
      } finally {
        setRoomInfoLoading(false);
      }
    };

    fetch();
  }, [roomId]);

  // 메시지 스크롤 유지
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleLeaveRoom = useCallback(async () => {
    if (!confirm("정말 채팅방을 나가시겠어요?")) return;
    try {
      await leaveRoom({ roomId, user: currentUser });
      await queryClient.invalidateQueries(
        QUERY_KEYS.MY_CHAT_ROOMS(currentUser.uid)
      );
      navigate("/chat");
    } catch (err) {
      toast.error("채팅방 나가기 중 오류 발생");
    }
  }, [roomId, currentUser, queryClient, navigate]);

  if (!roomId) {
    return (
      <div className="text-center text-gray-500">채팅방 ID가 없습니다.</div>
    );
  }

  if (messageLoading || roomInfoLoading) return <LoadingSpinner />;

  return (
    <ChatRoomDetail
      roomInfo={roomInfo}
      messages={messages}
      onLeave={handleLeaveRoom}
      scrollRef={scrollRef}
      roomId={roomId}
    />
  );
}
