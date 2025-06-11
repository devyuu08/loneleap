import SkeletonImage from "@/components/common/loading/SkeletonImage";

/**
 * 채팅방 참여자 목록 컴포넌트
 * - 참여자 수 표시
 * - SkeletonImage로 사용자 프로필 이미지 표시
 * - 참여자 이름 또는 이메일 일부 출력
 */

export default function ParticipantList({ users, isLoading }) {
  // 로딩 중이거나 users가 배열이 아니면 렌더링하지 않음
  if (isLoading || !Array.isArray(users)) return null;

  const participantCard =
    "bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-sm p-4";

  return (
    <section className={participantCard} aria-label="참여자 목록 섹션">
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
              <SkeletonImage
                src={user.photoURL || "/images/default-profile.png"}
                alt={user.displayName || "참여자"}
                objectFit="cover"
                className="rounded-full"
                size="w-8 h-8"
              />

              <span className="text-sm font-medium text-gray-800 leading-tight truncate">
                {user.displayName || user.email?.split("@")[0] || "알 수 없음"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
