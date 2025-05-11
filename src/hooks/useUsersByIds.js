import { useQuery } from "@tanstack/react-query";
import { db } from "services/firebase";
import { getDocs, query, where, collection } from "firebase/firestore";

export const useUsersByIds = (userIds = []) => {
  return useQuery({
    queryKey: ["usersByIds", userIds],
    enabled: Array.isArray(userIds) && userIds.length > 0,
    queryFn: async () => {
      const usersRef = collection(db, "users");
      const usersQuery = query(
        usersRef,
        where("uid", "in", userIds.slice(0, 10))
      );
      const querySnapshot = await getDocs(usersQuery);

      return querySnapshot.docs.map((doc) => doc.data());
    },
  });
};
