import { Camera } from "lucide-react";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

export default function ProfileInfoCard({ user, onImageChange }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative group w-32 h-32 mb-4">
        <SkeletonImage
          src={user?.photoURL || "/images/default-profile.png"}
          alt="프로필 이미지"
          className="rounded-full border-2 border-white shadow-md"
          size="w-32 h-32"
          objectFit="cover"
        />
        <label
          htmlFor="profile-image-upload"
          className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer"
        >
          <Camera className="w-6 h-6" />
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageChange}
          />
        </label>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-white">
          {user?.displayName || "닉네임 없음"}
        </h2>
        <p className="text-sm text-gray-400">@{user?.email?.split("@")[0]}</p>
        <p className="text-sm text-white mt-2 whitespace-pre-wrap max-w-md">
          {user?.bio?.trim() || "소개 문구가 없습니다."}
        </p>
      </div>
    </div>
  );
}
