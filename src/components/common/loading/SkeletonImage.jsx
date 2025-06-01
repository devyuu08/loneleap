import { useState } from "react";

export default function SkeletonImage({
  src,
  alt = "이미지",
  className = "",
  objectFit = "cover",
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* 로딩 중 또는 에러일 때 회색 배경 + 애니메이션 */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
      )}

      {/* 에러 발생 시 fallback 텍스트 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 bg-gray-100 z-10">
          이미지 불러오기 실패
        </div>
      )}

      {/* 실제 이미지 */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`transition-opacity duration-300 w-full h-full absolute inset-0 object-${objectFit} ${
          loaded && !error ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
}
