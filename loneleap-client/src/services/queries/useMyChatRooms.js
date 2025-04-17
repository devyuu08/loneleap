// src/services/queries/useMyChatRooms.js
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

export const useMyChatRooms = (uid) => {
  return useQuery({
    queryKey: ["myChatRooms", uid],
    enabled: !!uid,
    queryFn: async () => {
      const q = query(
        collection(db, "chatRooms"),
        where("participants", "array-contains", uid),
        orderBy("createdAt", "desc"),
        limit(20) // 한 번에 가져올 최대 문서 수 제한
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return [];
      }
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  });
};
