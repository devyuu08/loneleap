import { Instagram, Facebook, Twitter } from "lucide-react";

/**
 * Footer
 * - 사이트 전반의 정보, 고객 지원, 회사 소개, 소셜 링크 포함
 * - 모든 페이지 하단에 공통으로 사용됨
 */

export default function Footer() {
  const ICON_CLASS = "w-5 h-5 hover:text-gray-700 transition";
  const SECTION_TITLE_CLASS = "font-semibold text-gray-900 mb-3";

  const BOTTOM_LINE_CLASS =
    "border-t text-gray-400 text-xs flex flex-col sm:flex-row justify-between items-center gap-2 px-4 sm:px-6 py-4 text-center sm:text-left";

  return (
    <footer className="bg-gray-50 text-gray-700 text-sm border-t">
      {/* 콘텐츠 래퍼 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* 브랜드 소개 +  소셜 링크 */}
        <section className="text-center sm:text-left" aria-label="브랜드 소개">
          <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">
            LoneLeap
          </h3>
          <p className="text-gray-500 mb-4">
            당신만의 여정을 위한 감성적인 혼행 플랫폼
          </p>
          <nav
            className="flex justify-center sm:justify-start space-x-4 text-gray-500"
            aria-label="소셜 미디어 링크"
          >
            <a href="#" aria-label="Instagram">
              <Instagram className={ICON_CLASS} />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook className={ICON_CLASS} />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className={ICON_CLASS} />
            </a>
          </nav>
        </section>

        {/* 여행 정보 */}
        <section
          className="text-center sm:text-left"
          aria-labelledby="travel-info-title"
        >
          <h4 id="travel-info-title" className={SECTION_TITLE_CLASS}>
            여행 정보
          </h4>
          <nav>
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
          </nav>
        </section>

        {/* 고객 지원 */}
        <section
          className="text-center sm:text-left"
          aria-labelledby="support-title"
        >
          <h4 id="support-title" className={SECTION_TITLE_CLASS}>
            고객 지원
          </h4>
          <nav>
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
          </nav>
        </section>

        {/* 회사 정보 */}
        <section
          className="text-center sm:text-left"
          aria-labelledby="about-title"
        >
          <h4 id="about-title" className={SECTION_TITLE_CLASS}>
            LoneLeap 소개
          </h4>
          <nav>
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
          </nav>
        </section>
      </div>

      {/* 하단 라인 */}
      <div className={BOTTOM_LINE_CLASS}>
        <p>© {new Date().getFullYear()} LoneLeap. All rights reserved.</p>
        <div>
          <label htmlFor="language-select" className="sr-only">
            언어 선택
          </label>
          <select
            id="language-select"
            className="bg-transparent text-gray-500 focus:outline-none"
          >
            <option>한국어</option>
            <option>English</option>
          </select>
        </div>
      </div>
    </footer>
  );
}
