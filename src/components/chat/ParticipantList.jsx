import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "services/firebase";
import { useUsersByIds } from "hooks/useUsersByIds";

export default function ParticipantList({ roomId }) {
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

  const { data: users, isLoading } = useUsersByIds(userIds);

  if (isLoading || !Array.isArray(users)) return null;

  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-sm p-4">
      <p className="text-sm font-semibold text-gray-800 mb-4 border-b pb-2">
        현재 참여자 {users.length}명
      </p>

      <ul className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {users.map((user) => (
          <li key={user.uid} className="flex items-center gap-3">
            <img
              src={user.photoURL || "/images/default-profile.png"}
              alt={user.displayName || "참여자"}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-800 leading-tight truncate">
              {user.displayName || user.email.split("@")[0]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
