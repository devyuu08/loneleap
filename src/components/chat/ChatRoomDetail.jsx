import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { db } from "services/firebase";

import { useChatMessages } from "hooks/useChatMessages";
import MessageInput from "./MessageInput";
import ChatMessage from "./ChatMessage";
import LoadingSpinner from "components/common/LoadingSpinner.jsx";
import ChatHeader from "components/chat/ChatHeader";
import ParticipantList from "components/chat/ParticipantList";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function ChatRoomDetail({ roomId }) {
  const { messages, loading } = useChatMessages(roomId);
  const [roomInfo, setRoomInfo] = useState({ title: "채팅방" });
  const [roomInfoLoading, setRoomInfoLoading] = useState(false);
  const scrollRef = useRef(null);
  const executedRef = useRef(false);
  const currentUser = useSelector((state) => state.user.user); // 현재 로그인 유저

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  // participants에 현재 유저 등록

  useEffect(() => {
    const registerParticipant = async () => {
      if (!roomId || !currentUser?.uid || executedRef.current) return;
      executedRef.current = true;

      // 입장 처리
      try {
        const roomRef = doc(db, "chatRooms", roomId);
        const roomSnap = await getDoc(roomRef);
        const roomData = roomSnap.data();

        const alreadyIn = roomData?.participants?.includes(currentUser.uid);

        if (!alreadyIn) {
          await updateDoc(roomRef, {
            participants: arrayUnion(currentUser.uid),
          });

          await addDoc(collection(db, "chatMessages"), {
            type: "system",
            systemType: "join",
            userId: currentUser.uid,
            userName: currentUser.displayName || "익명",
            roomId,
            createdAt: serverTimestamp(),
          });
        }
      } catch (err) {
        console.error("채팅방 참여자 등록 실패:", err);
      }
    };

    registerParticipant();
  }, [roomId, currentUser]);

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

  const handleLeaveRoom = async () => {
    if (!confirm("정말 채팅방을 나가시겠어요?")) return;

    try {
      const roomRef = doc(db, "chatRooms", roomId);
      await updateDoc(roomRef, {
        participants: arrayRemove(currentUser.uid),
      });

      // 퇴장 메시지 전송
      await addDoc(collection(db, "chatMessages"), {
        type: "system",
        systemType: "leave",
        userId: currentUser.uid,
        userName: currentUser.displayName || "익명",
        roomId,
        createdAt: serverTimestamp(),
      });

      await queryClient.invalidateQueries(["myChatRooms", currentUser.uid]);

      navigate("/chat"); // 채팅방 목록으로 이동
    } catch (err) {
      alert("채팅방 나가기 중 오류 발생");
      console.error(err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/images/chat-detail-bg.jpg')" }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* 채팅 박스 */}
      <div className="relative z-10 w-full max-w-6xl h-full md:h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden flex">
        {/* 참여자 목록 (좌측 사이드) */}
        <aside className="hidden md:block w-64 border-r border-gray-200 bg-white/70 backdrop-blur-md p-4">
          <ParticipantList roomId={roomId} />
        </aside>

        {/* 채팅 영역 */}
        <div className="flex-1 flex flex-col">
          {/* 상단 헤더 */}
          <ChatHeader
            title={roomInfo.name || "채팅방"}
            userName={roomInfo.createdBy?.displayName || "익명"}
            onLeave={handleLeaveRoom}
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
    </section>
  );
}
