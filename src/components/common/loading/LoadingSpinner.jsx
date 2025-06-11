export default function LoadingSpinner({ size = "md", fullscreen = true }) {
  const sizeMap = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-14 h-14 border-[6px]",
  };

  return (
    <div
      className={`${
        fullscreen
          ? "flex justify-center items-center h-screen"
          : "flex justify-center items-center py-20"
      }`}
      role="status"
      aria-label="Loading"
      aria-live="assertive"
    >
      <div
        className={`rounded-full border-gray-300 border-t-gray-800 animate-spin ${sizeMap[size]}`}
      />
    </div>
  );
}
