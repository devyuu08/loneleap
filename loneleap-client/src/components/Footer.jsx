// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-2 text-white">LoneLeap</h3>
          <p className="text-gray-400">
            혼자 떠나는 여행을 위한 감성 플랫폼
            <br />© {new Date().getFullYear()} LoneLeap
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">여행지</h4>
          <ul className="space-y-1">
            <li>제주도</li>
            <li>부산</li>
            <li>경주</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">고객 지원</h4>
          <ul className="space-y-1">
            <li>자주 묻는 질문</li>
            <li>문의하기</li>
            <li>이용약관</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">뉴스레터</h4>
          <input
            type="email"
            placeholder="이메일 주소"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
          />
          <button className="mt-2 w-full bg-white text-gray-900 font-semibold py-2 rounded hover:bg-gray-100 transition">
            구독
          </button>
        </div>
      </div>
    </footer>
  );
}
