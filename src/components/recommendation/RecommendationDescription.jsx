import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MapPin } from "lucide-react";

/**
 * RecommendationDescription
 * - 추천 여행지 상세 페이지에서 설명 마크다운과 위치 정보를 렌더링
 * - 마크다운은 ReactMarkdown + remark-gfm 플러그인으로 렌더링
 * - 위치 정보는 지도와 함께 표시되는 보조 정보로 제공
 */

function RecommendationDescription({ description, locationInfo }) {
  return (
    <section
      aria-labelledby="description-heading"
      className="py-16 border-b px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* 제목은 시각적 heading 대신 숨긴 접근성 태그로 제공 */}
        <h2 id="description-heading" className="sr-only">
          추천 여행지 설명
        </h2>

        {/* 상세 설명 마크다운 렌더링 */}
        <article>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="text-neutral-800 text-[15px] leading-relaxed tracking-wide mb-5">
                  {children}
                </p>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-gray-300 pl-4 italic text-sm leading-relaxed mb-6 [&>p]:text-gray-500">
                  {children}
                </blockquote>
              ),
            }}
          >
            {description}
          </ReactMarkdown>
        </article>

        {/* 위치 정보 */}
        <address className="not-italic mt-8 text-sm text-gray-500 flex items-center gap-2">
          <MapPin className="w-4 h-4" aria-hidden="true" />
          {locationInfo}
        </address>
      </div>
    </section>
  );
}

export default React.memo(RecommendationDescription);
