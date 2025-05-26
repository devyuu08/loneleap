import { useEffect, useState, useRef, useCallback } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "services/firebase";
import dayjs from "dayjs";

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
      orderBy("createdAt", "desc"),
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

          const ordered = msgs.reverse(); // 시간 순 정렬
          const withDates = insertDateSeparators(ordered); // 날짜 구분 삽입
          setMessages(withDates);

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

  // 이전 메시지 불러오기
  const loadMoreMessages = useCallback(async () => {
    if (!roomId || !lastDoc) return;
    setLoading(true);

    try {
      const moreQuery = query(
        collection(db, "chatMessages"),
        where("roomId", "==", roomId),
        orderBy("createdAt", "desc"),
        limit(messagesPerPage.current)
      );

      const snapshot = await getDocs(moreQuery);
      const moreMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages((prev) => [...prev, ...moreMessages.reverse()]); // 역순으로 추가

      if (snapshot.docs.length > 0) {
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      }
    } catch (err) {
      console.error("이전 메시지 로드 중 오류:", err);
    } finally {
      setLoading(false);
    }
  }, [roomId, lastDoc]);

  // 날짜 구분 메시지 삽입 함수
  const insertDateSeparators = (messages) => {
    const result = [];
    let lastDate = null;

    messages.forEach((msg) => {
      const date = dayjs(msg.createdAt?.toDate?.() || msg.createdAt).format(
        "YYYY-MM-DD"
      );

      if (date !== lastDate) {
        result.push({
          id: `date-${date}`,
          type: "system",
          systemType: "date",
          message: dayjs(date).format("YYYY년 M월 D일"),
          createdAt: msg.createdAt,
        });
        lastDate = date;
      }

      result.push(msg);
    });

    return result;
  };

  return {
    messages,
    loading,
    loadMoreMessages,
  };
};
