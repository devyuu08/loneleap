import { Link } from "react-router-dom";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4">
      {/* 아이콘과 숫자 */}
      <div className="flex flex-col items-center space-y-2 mb-8">
        <Ghost className="w-10 h-10 text-gray-400" />
        <h1 className="text-8xl font-extrabold tracking-widest text-gray-300">
          404
        </h1>
      </div>

      {/* 메시지 */}
      <p className="text-lg text-center text-gray-600 mb-6">
        죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
        <br className="hidden sm:block" />
        입력하신 주소가 잘못되었거나, 존재하지 않는 경로일 수 있습니다.
      </p>

      {/* 홈 버튼 */}
      <Link
        to="/"
        className="inline-block px-6 py-3 rounded-full bg-gray-800 text-white text-sm font-medium shadow-md hover:bg-gray-700 transition"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
