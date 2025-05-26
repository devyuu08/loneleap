import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
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

import { useChatMessages } from "hooks/chat/useChatMessages";
import LoadingSpinner from "components/common/LoadingSpinner.jsx";
import ChatRoomDetail from "components/chat/ChatRoomDetail";

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
