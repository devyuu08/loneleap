import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "services/firebase";

import { useChatMessages } from "hooks/useChatMessages";
import MessageInput from "./MessageInput";
import ChatMessage from "./ChatMessage";
import LoadingSpinner from "components/common/LoadingSpinner.jsx";

export default function ChatRoomDetail({ roomId }) {
  const { messages, loading } = useChatMessages(roomId);
  const [roomInfo, setRoomInfo] = useState({ title: "채팅방" });
  const [roomInfoLoading, setRoomInfoLoading] = useState(false);
  const scrollRef = useRef(null);

  const currentUser = useSelector((state) => state.user.user); // 현재 로그인 유저

  // participants에 현재 유저 등록
  useEffect(() => {
    const registerParticipant = async () => {
      if (!roomId || !currentUser?.uid) return;

      try {
        const roomRef = doc(db, "chatRooms", roomId);
        await updateDoc(roomRef, {
          participants: arrayUnion(currentUser.uid),
        });
      } catch (err) {
        console.error("채팅방 참여자 등록 실패:", err);
      }
    };

    registerParticipant();
  }, [roomId, currentUser?.uid]);

  // Firestore에서 채팅방 정보 불러오기
  useEffect(() => {
    if (!roomId) return;
    const fetchRoomInfo = async () => {
      setRoomInfoLoading(true);
      try {
        const docRef = doc(db, "chatRooms", roomId);
        const roomDoc = await getDoc(docRef);
        if (roomDoc.exists()) {
          setRoomInfo(roomDoc.data());
        }
      } catch (err) {
        console.error("채팅방 정보 가져오기 실패:", err);
      } finally {
        setRoomInfoLoading(false);
      }
    };
    fetchRoomInfo();
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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-var(--header-height,80px))]">
      <div className="mb-4">
        <h2 className="text-xl font-bold">{roomInfo.name || "채팅방"}</h2>
      </div>

      <div
        className="flex-1 overflow-y-auto space-y-4 px-1"
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="채팅 메시지"
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>

      <div className="mt-4" role="form" aria-label="메시지 입력">
        <MessageInput roomId={roomId} />
      </div>
    </div>
  );
}
