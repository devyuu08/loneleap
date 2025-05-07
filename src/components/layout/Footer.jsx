import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 text-sm border-t">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* 브랜드 소개 + 소셜 */}
        <div>
          <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
            LoneLeap
          </h3>
          <p className="text-gray-500 mb-4">
            당신만의 여정을 위한 감성적인 혼행 플랫폼
          </p>
          <div className="flex space-x-4 text-gray-500">
            <a href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5 hover:text-gray-700 transition" />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:text-gray-700 transition" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-5 h-5 hover:text-gray-700 transition" />
            </a>
          </div>
        </div>

        {/* 여행 정보 */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">여행 정보</h4>
          <ul className="space-y-2">
            <li>
              <a href="#">인기 여행지</a>
            </li>
            <li>
              <a href="#">추천 일정</a>
            </li>
            <li>
              <a href="#">혼행 가이드</a>
            </li>
            <li>
              <a href="#">여행 팁</a>
            </li>
          </ul>
        </div>

        {/* 고객 지원 */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">고객 지원</h4>
          <ul className="space-y-2">
            <li>
              <a href="#">자주 묻는 질문</a>
            </li>
            <li>
              <a href="#">문의하기</a>
            </li>
            <li>
              <a href="#">이용약관</a>
            </li>
            <li>
              <a href="#">개인정보처리방침</a>
            </li>
          </ul>
        </div>

        {/* 회사 정보 */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">LoneLeap 소개</h4>
          <ul className="space-y-2">
            <li>
              <a href="#">회사 소개</a>
            </li>
            <li>
              <a href="#">채용 정보</a>
            </li>
            <li>
              <a href="#">파트너십</a>
            </li>
            <li>
              <a href="#">보도자료</a>
            </li>
          </ul>
        </div>
      </div>

      {/* 바텀 라인 */}
      <div className="border-t text-gray-400 text-xs flex flex-col md:flex-row justify-between items-center px-6 py-4">
        <p>© {new Date().getFullYear()} LoneLeap. All rights reserved.</p>
        <div>
          <select className="bg-transparent text-gray-500 focus:outline-none">
            <option>한국어</option>
            <option>English</option>
          </select>
        </div>
      </div>
    </footer>
  );
}
