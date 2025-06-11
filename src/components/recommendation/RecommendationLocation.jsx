import { MapPin, Wand2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import KakaoMap from "@/components/recommendation/KakaoMap";

/**
 * RecommendationLocation
 * - 추천 여행지 상세 페이지의 위치 정보 섹션
 * - 카카오 지도, 찾아가는 방법, 주변 감성 장소 정보 포함
 */

export default function RecommendationLocation({
  directions = [],
  nearbyInfo = [],
  locationInfo,
}) {
  return (
    <section
      aria-labelledby="location-section-title"
      className="py-24 px-6 bg-white"
    >
      <div className="max-w-5xl mx-auto space-y-16">
        {/* 제목 */}
        <header className="text-center">
          <h2
            id="location-section-title"
            className="text-2xl font-bold text-gray-900"
          >
            위치 정보
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            찾아가는 방법과 주변 감성 포인트를 안내해드려요
          </p>
        </header>

        {/* 카카오 지도 */}
        <div aria-label="지도 영역">
          {locationInfo ? (
            <KakaoMap address={locationInfo} />
          ) : (
            <div className="w-full h-[320px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 text-sm tracking-wide">
              지도 정보가 없습니다
            </div>
          )}
        </div>

        {/* 찾아가는 방법 & 주변 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-gray-700">
          {/* 찾아가는 방법 */}
          <article aria-labelledby="direction-title">
            <h3
              id="direction-title"
              className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-4 tracking-wide"
            >
              <MapPin className="w-5 h-5 text-gray-500" />
              찾아가는 방법
            </h3>
            <div className="space-y-4 leading-relaxed text-[15px] text-gray-700">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p>{children}</p>,
                  li: ({ children }) => (
                    <li className="list-disc ml-5">{children}</li>
                  ),
                }}
              >
                {directions.join("\n")}
              </ReactMarkdown>
            </div>
          </article>

          {/* 주변 정보 */}
          <article aria-labelledby="nearby-title">
            <h3
              id="nearby-title"
              className="flex items-center gap-2 text-base font-semibold text-gray-800 mb-4 tracking-wide"
            >
              <Wand2 className="w-5 h-5 text-gray-500" />이 근처, 놓치면 아쉬운
              곳들
            </h3>
            <div className="space-y-4 leading-relaxed text-[15px] text-gray-700">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p>{children}</p>,
                  li: ({ children }) => (
                    <li className="list-disc ml-5">{children}</li>
                  ),
                }}
              >
                {nearbyInfo.join("\n")}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
