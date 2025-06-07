import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useUsersByIds } from "@/hooks/chat/useUsersByIds";
import ParticipantList from "@/components/chat/ParticipantList";

/**
 * ParticipantListContainer
 * - 채팅방 참여자 목록 실시간 조회 및 렌더링
 */

export default function ParticipantListContainer({ roomId }) {
  const [userIds, setUserIds] = useState([]);

  // 실시간 구독으로 participants 가져오기
  useEffect(() => {
    if (!roomId) return;

    const unsub = onSnapshot(doc(db, "chatRooms", roomId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.participants)) {
          setUserIds(data.participants);
        }
      }
    });

    return () => unsub();
  }, [roomId]);

  const { data: users, isLoading } = useUsersByIds(userIds, {
    enabled: userIds.length > 0, // 불필요한 쿼리 방지
  });

  return <ParticipantList users={users} isLoading={isLoading} />;
}
