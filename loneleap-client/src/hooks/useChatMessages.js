import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "services/firebase";

export const useChatMessages = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!roomId) return;
    setLoading(true);

    const q = query(
      collection(db, "chatMessages"),
      where("roomId", "==", roomId),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching chat messages:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [roomId]);

  return { messages, loading };
};
