import { useEffect, useState, useRef } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "services/firebase";

export const useChatMessages = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesPerPage = useRef(50); // 한 번에 가져올 메시지 수 제한

  useEffect(() => {
    if (!roomId) return;
    setLoading(true);

    const q = query(
      collection(db, "chatMessages"),
      where("roomId", "==", roomId),
      orderBy("createdAt", "asc"),
      limit(messagesPerPage.current)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          const msgs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(msgs);
        } catch (err) {
          console.error("채팅 메시지 처리 중 오류 발생:", err);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("채팅 메시지 가져오기 실패:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [roomId]);

  return { messages, loading };
};
