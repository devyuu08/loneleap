import { useState } from "react";

export default function SkeletonImage({ src, alt, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const fallbackSrc = "/images/placeholder.jpg";
  const finalSrc = error ? fallbackSrc : src;

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
      )}
      <img
        src={finalSrc}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`transition-opacity duration-300 w-full h-full object-cover absolute inset-0 ${className} ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
