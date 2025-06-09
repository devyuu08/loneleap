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
import { db } from "@/services/firebase";
import { insertDateSeparators } from "@/utils/chatUtils";

/**
 * useChatMessages
 * - 특정 채팅방의 최신 메시지를 실시간으로 구독하여 반환
 * - 최초 50개 메시지를 내림차순으로 불러오고, 이후 더보기 기능 제공
 * - 날짜 구분선을 삽입하여 메시지를 정렬함
 */

export function useChatMessages(roomId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const messagesPerPage = useRef(50); // 한 번에 불러올 수

  // 실시간 최신 메시지 구독
  useEffect(() => {
    if (!roomId) return;

    setLoading(true);
    const q = query(
      collection(db, "chatMessages"),
      where("roomId", "==", roomId),
      orderBy("createdAt", "desc"),
      limit(messagesPerPage.current)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const ordered = docs.reverse();
          setMessages(insertDateSeparators(ordered));
          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("실시간 구독 에러:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [roomId]);

  // 이전 메시지 불러오기
  const loadMoreMessages = useCallback(async () => {
    if (!roomId || !lastDoc) return;
    setLoadingMore(true);

    try {
      const moreQuery = query(
        collection(db, "chatMessages"),
        where("roomId", "==", roomId),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(messagesPerPage.current)
      );

      const snapshot = await getDocs(moreQuery);
      const more = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setMessages((prev) => insertDateSeparators([...more.reverse(), ...prev]));
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    } catch (err) {
      console.error("이전 메시지 로드 중 오류:", err);
      setError(err);
    } finally {
      setLoadingMore(false);
    }
  }, [roomId, lastDoc]);

  return { messages, loading, loadingMore, error, loadMoreMessages };
}
