import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function RecommendationLocation({
  directions = [],
  nearbyInfo = [],
}) {
  return (
    <section className="bg-[#F9FAFB] py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* 제목 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">위치 정보</h2>
          <p className="text-sm text-gray-500 mt-1">
            찾아가는 방법과 주변 정보
          </p>
        </div>

        {/* 지도 더미 */}
        <div className="w-full h-80 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">
          지도 영역 (1024×320)
        </div>

        {/* 방법 & 주변 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700">
          {/* 찾아가는 방법 */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">찾아가는 방법</h3>
            <div className="prose prose-sm max-w-none leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {directions.join("\n")}
              </ReactMarkdown>
            </div>
          </div>

          {/* 주변 정보 */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">주변 정보</h3>
            <div className="prose prose-sm max-w-none leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {nearbyInfo.join("\n")}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
