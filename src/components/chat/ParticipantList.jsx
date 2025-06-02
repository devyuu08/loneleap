export default function ParticipantList({ users, isLoading }) {
  if (isLoading || !Array.isArray(users)) return null;

  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-sm p-4">
      <p className="text-sm font-semibold text-gray-800 mb-4 border-b pb-2">
        현재 참여자 {users.length}명
      </p>

      {users.length === 0 ? (
        <p className="text-sm text-gray-500">아직 참여자가 없습니다.</p>
      ) : (
        <ul
          className="space-y-3 max-h-60 overflow-y-auto pr-1"
          aria-label="참여자 목록"
        >
          {users.map((user) => (
            <li key={user.uid} className="flex items-center gap-3">
              <img
                src={user.photoURL || "/images/default-profile.png"}
                alt={user.displayName || "참여자"}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-800 leading-tight truncate">
                {user.displayName || user.email?.split("@")[0] || "알 수 없음"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
