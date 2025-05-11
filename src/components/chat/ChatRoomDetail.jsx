import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "services/firebase";

import { useChatMessages } from "hooks/useChatMessages";
import MessageInput from "./MessageInput";
import ChatMessage from "./ChatMessage";
import LoadingSpinner from "components/common/LoadingSpinner.jsx";
import ChatHeader from "components/chat/ChatHeader";
import ParticipantList from "components/chat/ParticipantList";

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
    <div className="h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl h-full md:h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden flex">
        {/* 좌측: 참여자 목록 */}
        <aside className="hidden md:block w-64 border-r border-gray-200 bg-white/70 backdrop-blur-md p-4">
          <ParticipantList userIds={roomInfo.participants || []} />
        </aside>

        {/* 우측: 채팅 영역 */}
        <div className="flex-1 flex flex-col">
          {/* 헤더 */}
          <ChatHeader
            title={roomInfo.name}
            userName={roomInfo.createdByName || "상대 이름"}
          />

          {/* 메시지 목록 */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-label="채팅 메시지"
          >
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          </div>

          {/* 입력창 */}
          <div className="px-4 pb-6">
            <div className="rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-gray-200 p-3">
              <MessageInput roomId={roomId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
