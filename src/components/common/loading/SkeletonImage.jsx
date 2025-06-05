import { useState } from "react";

export default function SkeletonImage({
  src,
  alt = "이미지",
  className = "",
  fallbackSrc = "/images/no_image.png",
  objectFit = "cover",
  absolute = false,
  size = "",
}) {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [error, setError] = useState(false);

  const wrapperClass = `${absolute ? "absolute inset-0" : "relative"} ${size}`;

  const imageClass = `
    transition-opacity duration-300 
    w-full h-full max-w-full max-h-full 
    object-${objectFit} ${absolute ? "absolute inset-0" : ""} 
    ${loaded && !error ? "opacity-100" : "opacity-0"} 
    ${className}
  `;

  return (
    <div className={`${wrapperClass} ${className}`}>
      {/* 로딩 스켈레톤 */}
      {!loaded && !error && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse z-0 ${className}`}
        />
      )}

      {/* 에러 fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 bg-gray-100 z-10">
          이미지 불러오기 실패
        </div>
      )}

      {/* 실제 이미지 */}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
          } else {
            setError(true);
          }
        }}
        className={imageClass}
        style={{ willChange: "opacity" }}
      />
    </div>
  );
}
