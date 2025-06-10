import { Camera } from "lucide-react";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

/**
 * ProfileInfoCard
 * - 마이페이지 상단 프로필 정보를 보여주는 카드 컴포넌트
 * - 프로필 이미지, 닉네임, 이메일, 자기소개 문구 표시
 * - 프로필 이미지 클릭 시 업로드 가능 (input[type="file"])
 */

export default function ProfileInfoCard({ user, onImageChange, uploading }) {
  return (
    <section className="flex flex-col items-center text-center">
      {/* 프로필 이미지 업로드 영역 */}
      <figure className="relative group w-32 h-32 mb-4">
        <SkeletonImage
          key={user?.photoURL}
          src={user?.photoURL || "/images/default-profile.png"}
          alt="프로필 이미지"
          className="w-32 h-32 object-cover rounded-full border-2 border-white shadow-md"
        />
        {uploading && (
          <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center z-10">
            <span className="text-white text-sm">이미지 반영 중...</span>
          </div>
        )}

        {/* 이미지 변경 오버레이 */}
        <label
          htmlFor="profile-image-upload"
          className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer"
        >
          <Camera className="w-6 h-6" aria-hidden="true" />
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageChange}
            aria-label="프로필 이미지 업로드"
          />
        </label>
      </figure>

      {/* 사용자 정보 영역 */}
      <figcaption className="space-y-1">
        <h2 className="text-xl font-semibold text-white">
          {user?.displayName || "닉네임 없음"}
        </h2>

        <p className="text-sm text-gray-400">
          @{user?.email?.split("@")[0] || "unknown"}
        </p>

        <p className="text-sm text-white mt-2 whitespace-pre-wrap max-w-md">
          {user?.bio?.trim() || "소개 문구가 없습니다."}
        </p>
      </figcaption>
    </section>
  );
}
