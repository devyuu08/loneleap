// loneleap-admin/components/common/LoadingSpinner.jsx

export default function LoadingSpinner({ text = "불러오는 중..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin mb-2"></div>
      <p className="text-sm text-gray-400">{text}</p>
    </div>
  );
}
