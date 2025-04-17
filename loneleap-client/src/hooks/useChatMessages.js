import { useEffect, useState, useRef, useCallback } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "services/firebase";

export const useChatMessages = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);

  const messagesPerPage = useRef(50); // 한 번에 불러올 수

  // 실시간 최신 메시지 구독
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

          // 페이징 위한 마지막 문서 저장
          if (snapshot.docs.length > 0) {
            setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
          }
        } catch (err) {
          console.error("채팅 메시지 처리 중 오류:", err);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("채팅 메시지 구독 실패:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [roomId]);

  // 이전 메시지 불러오기 함수 (수동)
  const loadMoreMessages = useCallback(async () => {
    if (!roomId || !lastDoc) return;
    setLoading(true);

    try {
      const moreQuery = query(
        collection(db, "chatMessages"),
        where("roomId", "==", roomId),
        orderBy("createdAt", "asc"),
        startAfter(lastDoc),
        limit(messagesPerPage.current)
      );

      const snapshot = await getDocs(moreQuery);
      const moreMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages((prev) => [...prev, ...moreMessages]);

      if (snapshot.docs.length > 0) {
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      }
    } catch (err) {
      console.error("이전 메시지 로드 중 오류:", err);
    } finally {
      setLoading(false);
    }
  }, [roomId, lastDoc]);

  return {
    messages,
    loading,
    loadMoreMessages,
  };
};
