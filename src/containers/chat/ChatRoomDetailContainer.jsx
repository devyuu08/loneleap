import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { useChatMessages } from "hooks/chat/useChatMessages";
import LoadingSpinner from "components/common/LoadingSpinner.jsx";
import ChatRoomDetail from "components/chat/ChatRoomDetail";
import { joinRoom } from "services/chat/joinRoom";
import { leaveRoom } from "services/chat/leaveRoom";
import { fetchRoomInfo } from "services/chat/fetchRoomInfo";

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
      } catch (err) {
        console.error("채팅방 참여자 등록 실패:", err);
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
        console.error("채팅방 정보 가져오기 실패:", err);
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

  if (!roomId) {
    return (
      <div className="text-center text-gray-500">채팅방 ID가 없습니다.</div>
    );
  }

  const handleLeaveRoom = async () => {
    if (!confirm("정말 채팅방을 나가시겠어요?")) return;

    try {
      await leaveRoom({ roomId, user: currentUser });
      await queryClient.invalidateQueries(["myChatRooms", currentUser.uid]);
      navigate("/chat");
    } catch (err) {
      alert("채팅방 나가기 중 오류 발생");
      console.error(err);
    }
  };

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
