import { useUsersByIds } from "hooks/useUsersByIds"; // Firestore에서 사용자 정보 불러오는 커스텀 훅

export default function ParticipantList({ userIds = [] }) {
  const { data: users, isLoading } = useUsersByIds(userIds);

  if (isLoading || !Array.isArray(users)) return null;

  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-sm p-4">
      {/* 고정된 참여자 수 텍스트 */}
      <p className="text-sm font-semibold text-gray-800 mb-4 border-b pb-2">
        현재 참여자 {users.length}명
      </p>

      {/* 세로 리스트 형태 */}
      <ul className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {users.map((user) => (
          <li key={user.uid} className="flex items-center gap-3">
            <img
              src={user.photoURL || "/default_profile.png"}
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
