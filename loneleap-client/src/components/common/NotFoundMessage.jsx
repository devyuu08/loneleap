export default function NotFoundMessage({
  message = "요청한 데이터를 찾을 수 없습니다.",
}) {
  return (
    <div className="text-center py-20 text-gray-500">
      <div className="text-4xl mb-2">😢</div>
      <p className="text-base">{message}</p>
    </div>
  );
}
